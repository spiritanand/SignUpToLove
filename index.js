const form = $(".sign-up-form");
const formInputs = $(".form-input");

let formData = {};
const formClasses = [...formInputs].map(formInput => formInput.classList[1]);
formClasses.map(formClass => formData[formClass] = null)

function addSuccess(formDataKey) {
    const element = $(`.${formDataKey}`);
    element.addClass("success");
    element.removeClass("error");
}

function addError(formDataKey) {
    const element = $(`.${formDataKey}`);
    element.addClass("error");
    element.removeClass("success");
    return false;
}

function dataChange(formDataKey) {
    let formInput = formData[formDataKey]
    if (!formInput || formInput.length === 0)
        return addError(formDataKey);
    else
        addSuccess(formDataKey);
    
    return true;
}

function verifyData() {
    for (let formDataKey in formData) {
        let dataVerified = dataChange(formDataKey);
        if (!dataVerified)
            return false;
    }

    return passwordMatch();
}

function passwordMatch() {
    if($("#password").val() === $("#password-check").val())
        return true;
    
    addError("password");
    addError("password-check");
}

form.on("submit", (e) => {
    e.preventDefault();
    
    const dataVerified = verifyData();
    
    if (dataVerified){
        e.target.reset();
        formInputs.removeClass("success");
    }
})

formInputs.on("change", (e) => {
    let formDataKey = e.target.id;
    formData[formDataKey] = e.target.value;
    dataChange(formDataKey);
});


