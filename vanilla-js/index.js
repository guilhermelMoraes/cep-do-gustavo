
class BrazilianPostalCodesWithGustavo {
  constructor() {
    this.form = document.getElementById("form");
    this.cepInput = document.getElementById("cep-input");
    this.submitButton = document.getElementById("submit-button");
    this.locationSection = document.getElementById("cep__location");

    this.addressInput = document.getElementById("address");
    this.neighborhoodInput = document.getElementById("neighborhood");
    this.cityInput = document.getElementById("city");
    this.stateInput = document.getElementById("state");
  }

  createCepMask() {
    const cepMask = new Inputmask("99999[-]999");
    cepMask.mask(this.cepInput);
  }

  enableDisableSubmitButton() {
    this.cepInput.addEventListener("input", () => {
      this.submitButton.disabled = !this.cepInput.inputmask.isComplete();
    });
  }

  submitPostalCode() {
    this.form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const cep = this.cepInput.value.trim();

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        const cepDoesntExist = data.erro;
        
        this.submitButton.disabled = true;
        this.cepInput.classList.remove("is-valid", "is-invalid");

        if (cepDoesntExist) {
          this.cepInput.classList.add("is-invalid");
          this.locationSection.classList.add("d-none");

        } else {

          this.cepInput.classList.add("is-valid");
          this.locationSection.classList.remove("d-none");

          
          this.addressInput.value = data.logradouro;
          this.neighborhoodInput.value = data.bairro;
          this.cityInput.value = data.localidade;
          this.stateInput.value = data.uf;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.submitButton.disabled = false;
      }
    });
  }

  main() {
    this.createCepMask();
    this.enableDisableSubmitButton();
    this.submitPostalCode();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const application = new BrazilianPostalCodesWithGustavo();
  application.main();
});
