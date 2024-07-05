const cepInput = document.getElementById("cep-input");
const submitButton = document.getElementById("submit-button");

const cepMask = new Inputmask("99999[-]999");
cepMask.mask(cepInput);

cepInput.addEventListener("input", () => {
   submitButton.disabled = !cepInput.inputmask.isComplete()
});
