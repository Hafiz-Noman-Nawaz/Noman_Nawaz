const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadStream } = require('../config/cloudinary');

// @route   GET /api/projects
// @desc    Get all projects (sorted by order, then newest date)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects',
      error: error.message,
    });
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project',
      error: error.message,
    });
  }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private (Admin)
router.post(
  '/',
  protect,
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const {
        title,
        date,
        description,
        caseStudy,
        techStack,
        liveUrl,
        githubUrl,
        previewVideo,
        metrics,
        featured,
        showOnResume,
        order,
        thumbnailUrl: manualThumbnailUrl,
      } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: 'Title and description are required',
        });
      }

      // Handle thumbnail upload
      let finalThumbnail = manualThumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
      if (req.files && req.files['thumbnail'] && req.files['thumbnail'][0]) {
        finalThumbnail = await uploadStream(
          req.files['thumbnail'][0].buffer,
          'noman_portfolio/projects/thumbnails'
        );
      }

      // Handle gallery uploads
      let finalGallery = [];
      if (req.files && req.files['gallery']) {
        for (const file of req.files['gallery']) {
          const url = await uploadStream(file.buffer, 'noman_portfolio/projects/gallery');
          finalGallery.push(url);
        }
      }

      // Parse techStack if it's sent as a comma separated string or JSON string
      let parsedTechStack = [];
      if (typeof techStack === 'string') {
        try {
          parsedTechStack = JSON.parse(techStack);
        } catch {
          parsedTechStack = techStack.split(',').map((t) => t.trim()).filter(Boolean);
        }
      } else if (Array.isArray(techStack)) {
        parsedTechStack = techStack;
      }

      // Parse metrics
      let parsedMetrics = [];
      if (typeof metrics === 'string') {
        try {
          parsedMetrics = JSON.parse(metrics);
        } catch {
          parsedMetrics = metrics.split(',').map((m) => m.trim()).filter(Boolean);
        }
      } else if (Array.isArray(metrics)) {
        parsedMetrics = metrics;
      }

      const newProject = await Project.create({
        title,
        date: date || new Date().getFullYear().toString(),
        description,
        caseStudy: caseStudy || '',
        techStack: parsedTechStack.length > 0 ? parsedTechStack : ['React', 'Node.js', 'Tailwind CSS'],
        thumbnail: finalThumbnail,
        gallery: finalGallery,
        liveUrl: liveUrl || '',
        githubUrl: githubUrl || '',
        previewVideo: previewVideo || '',
        metrics: parsedMetrics,
        featured: featured === 'true' || featured === true,
        showOnResume: showOnResume !== 'false' && showOnResume !== false,
        order: Number(order) || 0,
      });

      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: newProject,
      });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create project',
        error: error.message,
      });
    }
  }
);

// @route   PUT /api/projects/:id
// @desc    Update an existing project
// @access  Private (Admin)
router.put(
  '/:id',
  protect,
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
        });
      }

      const {
        title,
        date,
        description,
        caseStudy,
        techStack,
        liveUrl,
        githubUrl,
        previewVideo,
        metrics,
        featured,
        showOnResume,
        order,
        thumbnailUrl: manualThumbnailUrl,
        existingGallery,
      } = req.body;

      if (title) project.title = title;
      if (date) project.date = date;
      if (description) project.description = description;
      if (caseStudy !== undefined) project.caseStudy = caseStudy;
      if (liveUrl !== undefined) project.liveUrl = liveUrl;
      if (githubUrl !== undefined) project.githubUrl = githubUrl;
      if (previewVideo !== undefined) project.previewVideo = previewVideo;
      if (featured !== undefined) project.featured = featured === 'true' || featured === true;
      if (showOnResume !== undefined) project.showOnResume = showOnResume === 'true' || showOnResume === true;
      if (order !== undefined) project.order = Number(order);

      // Parse metrics
      if (metrics !== undefined) {
        if (typeof metrics === 'string') {
          try {
            project.metrics = JSON.parse(metrics);
          } catch {
            project.metrics = metrics.split(',').map((m) => m.trim()).filter(Boolean);
          }
        } else if (Array.isArray(metrics)) {
          project.metrics = metrics;
        }
      }

      // Tech stack parsing
      if (techStack !== undefined) {
        if (typeof techStack === 'string') {
          try {
            project.techStack = JSON.parse(techStack);
          } catch {
            project.techStack = techStack.split(',').map((t) => t.trim()).filter(Boolean);
          }
        } else if (Array.isArray(techStack)) {
          project.techStack = techStack;
        }
      }

      // Thumbnail update
      if (req.files && req.files['thumbnail'] && req.files['thumbnail'][0]) {
        project.thumbnail = await uploadStream(
          req.files['thumbnail'][0].buffer,
          'noman_portfolio/projects/thumbnails'
        );
      } else if (manualThumbnailUrl) {
        project.thumbnail = manualThumbnailUrl;
      }

      // Gallery update
      let currentGallery = [];
      if (existingGallery) {
        if (typeof existingGallery === 'string') {
          try {
            currentGallery = JSON.parse(existingGallery);
          } catch {
            currentGallery = existingGallery.split(',').map(s => s.trim()).filter(Boolean);
          }
        } else if (Array.isArray(existingGallery)) {
          currentGallery = existingGallery;
        }
      } else {
        currentGallery = project.gallery || [];
      }

      if (req.files && req.files['gallery']) {
        for (const file of req.files['gallery']) {
          const url = await uploadStream(file.buffer, 'noman_portfolio/projects/gallery');
          currentGallery.push(url);
        }
      }
      project.gallery = currentGallery;

      await project.save();

      res.json({
        success: true,
        message: 'Project updated successfully',
        data: project,
      });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update project',
        error: error.message,
      });
    }
  }
);

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message,
    });
  }
});

module.exports = router;
