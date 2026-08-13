/* =========================================================
   PERSONAL PORTFOLIO — MAIN SCRIPT
   Vanilla JavaScript only, no dependencies.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. LOADING SCREEN
     Hides the loader once the page has fully loaded.
  --------------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 400);
  });
  // Fallback: force-hide loader after 2.5s in case load event is delayed
  setTimeout(() => loader.classList.add('hidden'), 2500);


  /* ---------------------------------------------------------
     2. CUSTOM CURSOR (desktop / mouse users only)
  --------------------------------------------------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouchDevice && cursorDot && cursorOutline) {
    document.body.classList.add('cursor-active');

    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorOutline.style.left = `${e.clientX}px`;
      cursorOutline.style.top = `${e.clientY}px`;
    });

    const hoverTargets = document.querySelectorAll('a, button, .portfolio-card, input, textarea');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
    });
  }


  /* ---------------------------------------------------------
     3. NAVBAR: scroll state, dark-on-scroll, scroll-spy
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateScrollSpy() {
    let currentId = sections[0]?.id;
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.nav === currentId);
    });
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateScrollSpy();
    toggleScrollTopButton();
  });

  updateNavbar();
  updateScrollSpy();


  /* ---------------------------------------------------------
     4. THEME TOGGLE (light / dark)
  --------------------------------------------------------- */
  const THEME_KEY = 'portfolioTheme';
  const themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);

    if (themeToggle) {
      const isDark = nextTheme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Enable light mode' : 'Enable dark mode');
      themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  const initialTheme = savedTheme || 'light';
  applyTheme(initialTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });


  /* ---------------------------------------------------------
     4. MOBILE HAMBURGER MENU
  --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });


  /* ---------------------------------------------------------
     5. TYPING ANIMATION (hero role text)
  --------------------------------------------------------- */
  const typedTextEl = document.getElementById('typedText');
  const rolePhrases = ['Networking Student', 'Web Developer', 'UI Enthusiast'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentPhrase = rolePhrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedTextEl.textContent = currentPhrase.substring(0, charIndex);

    let typeSpeed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 1600; // pause at full phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % rolePhrases.length;
      typeSpeed = 400;
    }

    setTimeout(typeLoop, typeSpeed);
  }

  if (typedTextEl) typeLoop();


  /* ---------------------------------------------------------
     6. RIPPLE BUTTON EFFECT
  --------------------------------------------------------- */
  document.querySelectorAll('.ripple').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      circle.classList.add('ripple-circle');
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${e.clientX - rect.left - size / 2}px`;
      circle.style.top = `${e.clientY - rect.top - size / 2}px`;

      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });


  /* ---------------------------------------------------------
     7. INTERSECTION OBSERVER — reveal / fade-up on scroll
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => revealObserver.observe(el));


  /* ---------------------------------------------------------
     8. COUNTER ANIMATION (About mini-cards)
  --------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((el) => counterObserver.observe(el));


  /* ---------------------------------------------------------
     9. SKILL PROGRESS BARS (About section)
  --------------------------------------------------------- */
  const skillFills = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = `${fill.dataset.percent}%`;
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach((el) => skillObserver.observe(el));


  /* ---------------------------------------------------------
     10. ANIMATED CIRCULAR SKILL PROGRESS (Skills section)
  --------------------------------------------------------- */
  const CIRCUMFERENCE = 2 * Math.PI * 52; // r = 52

  function animateCircle(card) {
    const percent = parseInt(card.dataset.percent, 10);
    const circleFill = card.querySelector('.circle-fill');
    const label = card.querySelector('.circle-label b');
    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

    circleFill.style.strokeDashoffset = offset;

    // Animate the number counting up alongside the ring
    const duration = 1400;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      label.textContent = `${Math.floor(progress * percent)}%`;
      if (progress < 1) requestAnimationFrame(step);
      else label.textContent = `${percent}%`;
    }
    requestAnimationFrame(step);
  }

  const circleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCircle(entry.target);
        circleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.skill-circle').forEach((el) => circleObserver.observe(el));


  /* ---------------------------------------------------------
     11. PORTFOLIO ADMIN MODE + LOCAL STORAGE
  --------------------------------------------------------- */
  const ADMIN_PASSWORD_HASH = '395171fb693fb82471763d3f1c16b62ba3aae86fbe5579550bdfc04faa60a795';
  const STORAGE_KEY = 'portfolioProjects';
  const ADMIN_SESSION_KEY = 'portfolioAdminMode';

  const defaultProjects = [
    {
      id: cryptoId(),
      name: 'Personal Portfolio Website',
      description: 'A fully responsive personal portfolio built from scratch with HTML, CSS and vanilla JavaScript — featuring smooth scroll animations and elegant portfolio cards.',
      category: 'Web Design',
      image: 'public/projects/project1.jpg',
      github: 'https://github.com/jafarhaseena',
      demo: '#',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      order: 1,
      status: 'Published',
      featured: 'yes',
      createdAt: Date.now(),
    },
    {
      id: cryptoId(),
      name: 'Campus Network Simulation',
      description: 'A simulated LAN topology covering IP subnetting, VLAN segmentation and routing between departments, designed as part of Networking coursework.',
      category: 'Networking',
      image: 'public/projects/project2.jpg',
      github: 'https://github.com/jafarhaseena',
      demo: '#',
      technologies: ['Networking', 'Topology', 'Routing'],
      order: 2,
      status: 'Published',
      featured: 'no',
      createdAt: Date.now() + 1,
    },
    {
      id: cryptoId(),
      name: 'Task Manager App',
      description: 'A lightweight task manager built with vanilla JavaScript, featuring add/edit/delete actions, category filtering and smooth animations.',
      category: 'JavaScript',
      image: 'public/projects/project3.jpg',
      github: 'https://github.com/jafarhaseena',
      demo: '#',
      technologies: ['JavaScript', 'UI', 'LocalStorage'],
      order: 3,
      status: 'Published',
      featured: 'yes',
      createdAt: Date.now() + 2,
    },
    {
      id: cryptoId(),
      name: 'Restaurant Landing Page',
      description: 'An animated restaurant landing page with a JavaScript-powered menu filter, image gallery and scroll-triggered reveal animations.',
      category: 'Web & JS',
      image: 'public/projects/project4.jpg',
      github: 'https://github.com/jafarhaseena',
      demo: '#',
      technologies: ['CSS', 'JavaScript', 'Design'],
      order: 4,
      status: 'Published',
      featured: 'no',
      createdAt: Date.now() + 3,
    }
  ];

  function cryptoId() {
    return 'project-' + Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
  }

  function safeParse(data, fallback) {
    try {
      return JSON.parse(data) ?? fallback;
    } catch (error) {
      return fallback;
    }
  }

  function getStoredProjects() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = safeParse(saved, []);
    return Array.isArray(parsed) ? parsed : [];
  }

  let projectData = getStoredProjects();

  function saveProjects() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectData));
  }

  function getAdminMode() {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  }

  function setAdminMode(isActive) {
    localStorage.setItem(ADMIN_SESSION_KEY, String(isActive));
    document.body.classList.toggle('admin-mode', isActive);
    const adminPanel = document.getElementById('adminPanel');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    if (adminPanel) adminPanel.classList.toggle('hidden', !isActive);
    if (adminLoginBtn) {
      adminLoginBtn.textContent = isActive ? 'Admin Panel' : 'Admin Login';
      adminLoginBtn.setAttribute('aria-expanded', String(isActive));
    }
  }

  const portfolioGrid = document.getElementById('portfolioGrid');
  const portfolioEmptyState = document.getElementById('portfolioEmptyState');
  const projectSearch = document.getElementById('projectSearch');
  const projectCategoryFilter = document.getElementById('projectCategoryFilter');
  const projectSort = document.getElementById('projectSort');
  const projectCounter = document.getElementById('projectCounter');
  const projectForm = document.getElementById('projectForm');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalGithub = document.getElementById('modalGithub');
  const modalDemo = document.getElementById('modalDemo');

  function parseTechnologies(value) {
    if (Array.isArray(value)) return value;
    return String(value || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function normalizeProject(project) {
    return {
      id: project.id || cryptoId(),
      name: project.name || 'Untitled Project',
      description: project.description || '',
      category: project.category || 'General',
      image: project.image || 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 260%22%3E%3Crect width=%22400%22 height=%22260%22 fill=%22%23f4b400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 text-anchor=%22middle%22 fill=%22%23111%22 font-family=%22sans-serif%22%3EProject%3C/text%3E%3C/svg%3E',
      github: project.github || '#',
      demo: project.demo || '#',
      technologies: parseTechnologies(project.technologies),
      order: Number(project.order) || 1,
      status: project.status || 'Published',
      featured: project.featured === 'yes' || project.featured === true ? 'yes' : 'no',
      createdAt: project.createdAt || Date.now(),
    };
  }

  function getProjectCategories() {
    const categories = new Set();
    projectData.forEach((project) => {
      const normalized = normalizeProject(project);
      if (normalized.category) categories.add(normalized.category);
    });
    return Array.from(categories).sort((a, b) => a.localeCompare(b));
  }

  function populateCategoryFilter() {
    if (!projectCategoryFilter) return;

    const categories = getProjectCategories();
    const currentValue = projectCategoryFilter.value || 'all';
    projectCategoryFilter.innerHTML = '<option value="all">All Categories</option>' + categories.map((category) => `<option value="${category}">${category}</option>`).join('');
    projectCategoryFilter.value = categories.includes(currentValue) ? currentValue : 'all';
  }

  function renderPortfolio() {
    if (!portfolioGrid) return;

    const searchValue = (projectSearch?.value || '').trim().toLowerCase();
    const selectedCategory = projectCategoryFilter?.value || 'all';
    const sortValue = projectSort?.value || 'display';

    const filteredProjects = [...projectData]
      .map(normalizeProject)
      .filter((project) => {
        const matchesSearch = !searchValue || [project.name, project.description, project.category, project.technologies.join(' ')].join(' ').toLowerCase().includes(searchValue);
        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortValue === 'featured') {
          const featuredDiff = (b.featured === 'yes' ? 1 : 0) - (a.featured === 'yes' ? 1 : 0);
          if (featuredDiff !== 0) return featuredDiff;
        }
        if (sortValue === 'name') return a.name.localeCompare(b.name);
        if (sortValue === 'newest') return b.createdAt - a.createdAt;
        return Number(a.order) - Number(b.order);
      });

    portfolioGrid.innerHTML = filteredProjects.map((project) => {
      const technologyTags = project.technologies.slice(0, 3).map((tech) => `<span class="tech-tag">${tech}</span>`).join('');
      return `
        <article class="portfolio-card ${project.featured === 'yes' ? 'featured' : ''} ${document.body.classList.contains('admin-mode') ? 'admin-edit-mode' : ''}" data-project-id="${project.id}" data-category="${project.category}">
          <div class="project-card-admin">
            <button type="button" class="project-edit-btn" data-edit-id="${project.id}" aria-label="Edit ${project.name}"><i class="fa-solid fa-pen"></i></button>
            <button type="button" class="project-delete-btn" data-delete-id="${project.id}" aria-label="Delete ${project.name}"><i class="fa-solid fa-trash"></i></button>
          </div>
          <div class="portfolio-img">
            <img src="${project.image}" alt="${project.name}" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 260%22%3E%3Crect width=%22400%22 height=%22260%22 fill=%22%23f4b400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 text-anchor=%22middle%22 fill=%22%23111%22 font-family=%22sans-serif%22%3EProject%3C/text%3E%3C/svg%3E'" />
            <div class="portfolio-overlay">
              <button class="portfolio-view" type="button" data-detail-id="${project.id}" aria-label="View project details"><i class="fa-solid fa-eye"></i></button>
            </div>
          </div>
          <div class="portfolio-info">
            <span class="portfolio-tag">${project.category}</span>
            <h3>${project.name}</h3>
            <p>${project.description.length > 110 ? `${project.description.slice(0, 110)}...` : project.description}</p>
            <div class="project-meta-row">${technologyTags}</div>
            <div class="project-actions">
              <a class="btn btn-outline ripple" href="${project.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> GitHub</a>
              <a class="btn btn-primary ripple" href="${project.demo || '#'}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    if (projectCounter) {
      projectCounter.textContent = `${filteredProjects.length} Project${filteredProjects.length === 1 ? '' : 's'}`;
    }

    const hasProjects = filteredProjects.length > 0;
    if (portfolioEmptyState) {
      portfolioEmptyState.classList.toggle('visible', !hasProjects);
    }

    document.querySelectorAll('.portfolio-view').forEach((button) => {
      button.addEventListener('click', () => openProjectDetail(button.dataset.detailId));
    });

    document.querySelectorAll('.project-edit-btn').forEach((button) => {
      button.addEventListener('click', () => openProjectEditor(button.dataset.editId));
    });

    document.querySelectorAll('.project-delete-btn').forEach((button) => {
      button.addEventListener('click', () => deleteProject(button.dataset.deleteId));
    });
  }

  function openProjectDetail(projectId) {
    const project = normalizeProject(projectData.find((item) => item.id === projectId));
    if (!project) return;

    modalImg.src = project.image;
    modalImg.alt = project.name;
    modalTag.textContent = project.category;
    modalTitle.textContent = project.name;
    modalDesc.textContent = `${project.description}\n\nStatus: ${project.status}\nTechnologies: ${project.technologies.join(', ')}`;
    modalGithub.href = project.github || '#';
    modalDemo.href = project.demo || '#';

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const adminPanel = document.getElementById('adminPanel');
  const adminLoginModal = document.getElementById('adminLoginModal');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminLoginError = document.getElementById('adminLoginError');
  const adminPasswordField = document.getElementById('adminPassword');

  function openModalById(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModalById(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.app-modal-overlay.active, .modal-overlay.active')) {
      document.body.style.overflow = '';
    }
  }

  function validatePassword(inputValue) {
    return !!inputValue && inputValue.trim().length > 0;
  }

  async function sha256(value) {
    const encoded = new TextEncoder().encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(hashBuffer)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  async function attemptAdminLogin(event) {
    event.preventDefault();
    const enteredPassword = adminPasswordField.value.trim();

    if (!enteredPassword) {
      adminLoginError.textContent = 'Incorrect Password';
      adminLoginModal.classList.add('shake');
      setTimeout(() => adminLoginModal.classList.remove('shake'), 450);
      return;
    }

    const isValid = await sha256(enteredPassword).then((hash) => hash === ADMIN_PASSWORD_HASH);
    if (!isValid) {
      adminLoginError.textContent = 'Incorrect Password';
      adminLoginModal.classList.add('shake');
      setTimeout(() => adminLoginModal.classList.remove('shake'), 450);
      adminPasswordField.value = '';
      return;
    }

    setAdminMode(true);
    closeModalById('adminLoginModal');
    adminLoginForm.reset();
    adminLoginError.textContent = '';
  }

  adminLoginBtn.addEventListener('click', () => {
    if (getAdminMode()) {
      adminPanel.classList.toggle('hidden');
      return;
    }
    openModalById('adminLoginModal');
  });

  adminLoginForm.addEventListener('submit', attemptAdminLogin);

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => closeModalById(button.dataset.closeModal));
  });

  projectForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const editingId = event.target.dataset.editingId;
    const projectPayload = {
      id: editingId || cryptoId(),
      name: formData.get('projectName').toString().trim(),
      description: formData.get('projectDescription').toString().trim(),
      category: formData.get('projectCategory').toString().trim(),
      image: document.getElementById('projectImagePreview').dataset.image || '',
      github: formData.get('projectGithub').toString().trim(),
      demo: formData.get('projectDemo').toString().trim() || '#',
      technologies: parseTechnologies(formData.get('projectTechnologies').toString()),
      order: Number(formData.get('projectOrder')) || 1,
      status: formData.get('projectStatus').toString(),
      featured: formData.get('projectFeatured').toString(),
      createdAt: editingId ? projectData.find((project) => project.id === editingId)?.createdAt || Date.now() : Date.now(),
    };

    if (!projectPayload.name || !projectPayload.description || !projectPayload.category || !projectPayload.github || !projectPayload.image) {
      showToast('Please complete all required fields, including the image.', true);
      return;
    }

    if (editingId) {
      projectData = projectData.map((project) => project.id === editingId ? normalizeProject(projectPayload) : project);
    } else {
      projectData.push(normalizeProject(projectPayload));
    }

    saveProjects();
    populateCategoryFilter();
    renderPortfolio();
    projectForm.reset();
    closeModalById('projectModal');
    resetProjectForm();
    showToast(editingId ? 'Project updated successfully.' : 'Project added successfully.');
  });

  function resetProjectForm() {
    const form = document.getElementById('projectForm');
    const preview = document.getElementById('projectImagePreview');
    const dropZone = document.getElementById('imageDropZone');
    if (form) form.reset();
    if (preview) {
      preview.src = '';
      preview.classList.remove('visible');
      delete preview.dataset.image;
    }
    if (dropZone) dropZone.classList.remove('dragover');
  }

  function openProjectEditor(projectId) {
    const toEdit = normalizeProject(projectData.find((project) => project.id === projectId));
    if (!toEdit) return;

    const form = document.getElementById('projectForm');
    form.dataset.editingId = projectId;
    document.getElementById('projectModalTitle').textContent = 'Edit Project';
    document.getElementById('projectName').value = toEdit.name;
    document.getElementById('projectDescription').value = toEdit.description;
    document.getElementById('projectCategory').value = toEdit.category;
    document.getElementById('projectGithub').value = toEdit.github;
    document.getElementById('projectDemo').value = toEdit.demo === '#' ? '' : toEdit.demo;
    document.getElementById('projectTechnologies').value = toEdit.technologies.join(', ');
    document.getElementById('projectOrder').value = toEdit.order;
    document.getElementById('projectStatus').value = toEdit.status;
    document.getElementById('projectFeatured').value = toEdit.featured;
    document.getElementById('descriptionCounter').textContent = String(toEdit.description.length);

    const preview = document.getElementById('projectImagePreview');
    if (preview) {
      preview.src = toEdit.image;
      preview.classList.add('visible');
      preview.dataset.image = toEdit.image;
    }

    openModalById('projectModal');
  }

  function deleteProject(projectId) {
    const target = projectData.find((project) => project.id === projectId);
    if (!target) return;

    const confirmed = window.confirm(`Delete "${target.name}"?`);
    if (!confirmed) return;

    projectData = projectData.filter((project) => project.id !== projectId);
    saveProjects();
    populateCategoryFilter();
    renderPortfolio();
    showToast('Project deleted successfully.');
  }

  function showToast(message, isError = false) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'toast-error' : 'toast-success'}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('toast-visible'));
    setTimeout(() => {
      toast.classList.remove('toast-visible');
      setTimeout(() => toast.remove(), 260);
    }, 2600);
  }

  function handleAddProjectAction() {
    const form = document.getElementById('projectForm');
    if (form) form.removeAttribute('data-editingId');
    document.getElementById('projectModalTitle').textContent = 'Add Project';
    resetProjectForm();
    openModalById('projectModal');
  }

  document.querySelector('[data-admin-action="add"]')?.addEventListener('click', handleAddProjectAction);
  document.querySelector('[data-admin-action="edit"]')?.addEventListener('click', () => {
    const firstProject = projectData[0];
    if (!firstProject) {
      showToast('There is no project to edit yet.', true);
      return;
    }
    openProjectEditor(firstProject.id);
  });
  document.querySelector('[data-admin-action="delete"]')?.addEventListener('click', () => {
    const firstProject = projectData[0];
    if (!firstProject) {
      showToast('There is no project to delete yet.', true);
      return;
    }
    deleteProject(firstProject.id);
  });
  document.querySelector('[data-admin-action="logout"]')?.addEventListener('click', () => {
    setAdminMode(false);
    adminPanel.classList.add('hidden');
    adminLoginBtn.textContent = 'Admin Login';
    showToast('Logged out from Admin Mode.');
  });

  document.getElementById('projectDescription')?.addEventListener('input', (event) => {
    const count = event.target.value.length;
    document.getElementById('descriptionCounter').textContent = count;
  });

  document.getElementById('projectImage')?.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    validateImage(file, (result) => {
      const preview = document.getElementById('projectImagePreview');
      preview.src = result;
      preview.dataset.image = result;
      preview.classList.add('visible');
    });
  });

  const dropZone = document.getElementById('imageDropZone');
  if (dropZone) {
    ['dragenter', 'dragover'].forEach((eventName) => {
      dropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropZone.classList.add('dragover');
      });
    });
    ['dragleave', 'drop'].forEach((eventName) => {
      dropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropZone.classList.remove('dragover');
      });
    });
    dropZone.addEventListener('drop', (event) => {
      const file = event.dataTransfer.files?.[0];
      if (!file) return;
      validateImage(file, (result) => {
        const preview = document.getElementById('projectImagePreview');
        preview.src = result;
        preview.dataset.image = result;
        preview.classList.add('visible');
      });
    });
  }

  function validateImage(file, callback) {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file.', true);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be smaller than 5MB.', true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  }

  projectSearch?.addEventListener('input', renderPortfolio);
  projectCategoryFilter?.addEventListener('change', renderPortfolio);
  projectSort?.addEventListener('change', renderPortfolio);

  document.addEventListener('DOMContentLoaded', () => {
    setAdminMode(getAdminMode());
    populateCategoryFilter();
    renderPortfolio();
  });

  setAdminMode(getAdminMode());
  populateCategoryFilter();
  renderPortfolio();


  /* ---------------------------------------------------------
     13. TESTIMONIALS AUTO-SLIDER
  --------------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  const slides = track ? track.children : [];
  let currentSlide = 0;
  let sliderInterval;

  if (track && slides.length) {
    // Build dots
    Array.from(slides).forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      goToSlide(currentSlide);
    }

    function startSlider() {
      sliderInterval = setInterval(nextSlide, 4500);
    }

    function stopSlider() {
      clearInterval(sliderInterval);
    }

    startSlider();

    const sliderWrapper = document.querySelector('.testimonial-slider');
    sliderWrapper.addEventListener('mouseenter', stopSlider);
    sliderWrapper.addEventListener('mouseleave', startSlider);
  }


  /* ---------------------------------------------------------
     14. CONTACT FORM → WHATSAPP INTEGRATION
  --------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const WHATSAPP_NUMBER = '94779299696';

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const text =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Subject: ${subject}\n` +
      `Message: ${message}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank', 'noopener');
    contactForm.reset();
  });


  /* ---------------------------------------------------------
     15. SCROLL TO TOP BUTTON
  --------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTop');

  function toggleScrollTopButton() {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  }

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggleScrollTopButton();


  /* ---------------------------------------------------------
     16. FOOTER YEAR
  --------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
