const homepage = {
  events: () => {
    document.getElementById('contact-producers').addEventListener('click', homepage.contactProducers);
    document.getElementById('check-status').addEventListener('click', homepage.checkStatus);
  },
  contactProducers: async () => {
    const errorEle = document.getElementById('error');
    const successEle = document.getElementById('success');
    const result = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({year: document.getElementById('year').value})
    }).then(async response => await response.json());

    if (result.message) {
      errorEle.innerHTML = result.message;
      return errorEle.classList.remove('d-none');
    } else {
      errorEle.classList.add('d-none');
    }

    if (result.count) {
      successEle.innerHTML = result.count + ' producers have been contacted.';
      return successEle.classList.remove('d-none');
    } else {
      successEle.classList.add('d-none');
    }
  }
};

document.addEventListener("DOMContentLoaded", function() {
  homepage.events();
});