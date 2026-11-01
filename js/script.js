document.addEventListener('DOMContentLoaded', () => {

  // 1. Responsive Hamburger Navigation Menu
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 2. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // 3. Course Details Modal Data & Controller
  const courseDetailsMap = {
    mpc: {
      title: "Intermediate – MPC Stream",
      content: `
        <p><strong>Full Form:</strong> Mathematics, Physics, and Chemistry</p>
        <br>
        <p><strong>Duration:</strong> 2 Years</p>
        <p><strong>Eligibility:</strong> Pass in 10th Standard / SSC</p>
        <br>
        <h4>Key Subjects:</h4>
        <p>Mathematics, Physics, Chemistry, English, and Second Language.</p>
        <br>
        <h4>Career Opportunities:</h4>
        <p>Prepares students for B.Tech / B.E. Engineering degrees, Architecture (B.Arch), Data Science, Physical Sciences, B.Sc Mathematics, or entrance examinations like JEE Main and EAPCET.</p>
      `
    },
    bipc: {
      title: "Intermediate – BiPC Stream",
      content: `
        <p><strong>Full Form:</strong> Biology (Botany & Zoology), Physics, and Chemistry</p>
        <br>
        <p><strong>Duration:</strong> 2 Years</p>
        <p><strong>Eligibility:</strong> Pass in 10th Standard / SSC</p>
        <br>
        <h4>Key Subjects:</h4>
        <p>Botany, Zoology, Physics, Chemistry, English, and Second Language.</p>
        <br>
        <h4>Career Opportunities:</h4>
        <p>Pathway for MBBS (Medicine), BDS (Dental), B.Pharm (Pharmacy), Nursing, B.Sc Agriculture, Veterinary Science, Biotechnology, or NEET qualification.</p>
      `
    },
    cec: {
      title: "Intermediate – CEC Stream",
      content: `
        <p><strong>Full Form:</strong> Civics, Economics, and Commerce</p>
        <br>
        <p><strong>Duration:</strong> 2 Years</p>
        <p><strong>Eligibility:</strong> Pass in 10th Standard / SSC</p>
        <br>
        <h4>Key Subjects:</h4>
        <p>Civics, Economics, Commerce, Accountancy, and Languages.</p>
        <br>
        <h4>Career Opportunities:</h4>
        <p>Leads to B.Com, BBA, Chartered Accountancy (CA foundation), Company Secretary (CS), Business Management, Law (CLAT), or Civil Services preparation.</p>
      `
    },
    mec: {
      title: "Intermediate – MEC Stream",
      content: `
        <p><strong>Full Form:</strong> Mathematics, Economics, and Commerce</p>
        <br>
        <p><strong>Duration:</strong> 2 Years</p>
        <p><strong>Eligibility:</strong> Pass in 10th Standard / SSC</p>
        <br>
        <h4>Key Subjects:</h4>
        <p>Mathematics, Economics, Commerce, and Languages.</p>
        <br>
        <h4>Career Opportunities:</h4>
        <p>Ideal choice for analytical business fields including Financial Analysis, Actuarial Science, B.Com (Honours), Economics (B.A/B.Sc), and CA.</p>
      `
    },
    polytechnic: {
      title: "Diploma / Polytechnic Engineering",
      content: `
        <p><strong>Overview:</strong> Technical hands-on education in practical engineering streams.</p>
        <br>
        <p><strong>Duration:</strong> 3 Years</p>
        <p><strong>Eligibility:</strong> Pass in 10th Standard (Admissions usually through POLYCET test)</p>
        <br>
        <h4>Popular Branches:</h4>
        <p>Civil, Mechanical, Computer Engineering, Electrical & Electronics (EEE), Electronics & Communication (ECE).</p>
        <br>
        <h4>Career Opportunities:</h4>
        <p>Junior Engineer positions in public/private sectors, technical technician roles, or direct lateral entry into the 2nd year of B.Tech programs.</p>
      `
    },
    iti: {
      title: "Industrial Training Institutes (ITI)",
      content: `
        <p><strong>Overview:</strong> Vocational trade training focused on technical skills.</p>
        <br>
        <p><strong>Duration:</strong> 1 to 2 Years depending on the trade</p>
        <p><strong>Eligibility:</strong> Pass in 10th Standard</p>
        <br>
        <h4>Popular Trades:</h4>
        <p>Electrician, Fitter, Welder, Turner, Motor Mechanic, COPA (Computer Operator & Programming Assistant).</p>
        <br>
        <h4>Career Opportunities:</h4>
        <p>Technician roles in manufacturing plants, Railways, state power corporations, or immediate self-employment.</p>
      `
    },
    vocational: {
      title: "Vocational Courses",
      content: `
        <p><strong>Overview:</strong> Industry-tailored operational skill training.</p>
        <br>
        <p><strong>Duration:</strong> 1 to 2 Years</p>
        <p><strong>Eligibility:</strong> Pass in 10th Standard</p>
        <br>
        <h4>Key Specializations:</h4>
        <p>Healthcare Assistant, Horticulture, Digital Marketing, Retail Operations, Hospitality.</p>
        <br>
        <h4>Career Opportunities:</h4>
        <p>Direct entry-level employment in service industries, clinics, retail setups, or small businesses.</p>
      `
    },
    skill: {
      title: "Skill Development Programs",
      content: `
        <p><strong>Overview:</strong> Short-term certifications enhancing digital and personal skills.</p>
        <br>
        <p><strong>Duration:</strong> 3 to 6 Months</p>
        <p><strong>Eligibility:</strong> Open to all students</p>
        <br>
        <h4>Key Offerings:</h4>
        <p>Basic Coding, Web Development, Spoken English, Graphic Design, Office Automation.</p>
        <br>
        <h4>Career Opportunities:</h4>
        <p>Complements regular education to build career-ready competencies.</p>
      `
    }
  };

  const courseModal = document.getElementById('course-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');
  const modalTriggers = document.querySelectorAll('.modal-trigger');

  if (courseModal && modalCloseBtn && modalBody) {
    modalTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-course');
        const data = courseDetailsMap[key];

        if (data) {
          modalBody.innerHTML = `<h3>${data.title}</h3><div style="margin-top: 1rem;">${data.content}</div>`;
          courseModal.classList.add('active');
        }
      });
    });

    modalCloseBtn.addEventListener('click', () => {
      courseModal.classList.remove('active');
    });

    courseModal.addEventListener('click', (e) => {
      if (e.target === courseModal) {
        courseModal.classList.remove('active');
      }
    });
  }

  // 4. CSP Photo Gallery Lightbox Popup
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightboxModal && lightboxCloseBtn && lightboxImg && lightboxCaption) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const src = item.getAttribute('data-src');
        const caption = item.getAttribute('data-caption');

        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightboxModal.classList.add('active');
      });
    });

    lightboxCloseBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // 5. ESC Key Listener to Close Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (courseModal && courseModal.classList.contains('active')) {
        courseModal.classList.remove('active');
      }
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        lightboxModal.classList.remove('active');
      }
    }
  });

});