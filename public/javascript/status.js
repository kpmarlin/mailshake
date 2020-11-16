const status = {
  fetchData: async () => {
    const template = '{{#each this}}<div class="col col-lg-3 col-sm-10">{{@key}}</div><div class="col col-lg-1 col-sm-2">{{#if this}}Sent{{else}}Pending{{/if}}</div>{{/each}}';
    const result = await fetch('http://localhost:3000/api/status', {
      headers: {'Content-Type': 'application/json'}
    }).then(async response => await response.json());

    if (result.message) {
      let ele = document.getElementById('error');

      ele.innerHTML = result.message;
      return ele.classList.remove('d-none');
    }

    document.getElementById('emails').innerHTML = Handlebars.compile(template)(result);
  }
};

document.addEventListener("DOMContentLoaded", function() {
  status.fetchData();
});