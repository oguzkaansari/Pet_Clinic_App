let pets = [];
let types = [];
let selectedPetId = 0;
let selectedTypeId = 0;
let selectedPet = {};
let selectedType = {};

function getAllPets() {

    $.ajax({
        url: '/lab/pets',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            pets = data;
            createPetSelect();
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function getTestTypes() {

    $.ajax({
        url: '/lab/types',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            types = data;
            createTypeSelect();
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function createPetSelect() {

    let html = ``;
    for (let i = 0; i < pets.length; i++) {
        const itm = pets[i];
        html += `<option value="`+itm.id+`" data-subtext="`+itm.cardno+`">`+itm.name+`</option>`;
    }
    $("#p_selectlab").append(html);
    $("#p_selectlab").selectpicker("refresh");
}

function createTypeSelect() {

    let html = ``;
    for (let i = 0; i < types.length; i++) {
        const itm = types[i];
        html += `<option value="`+itm.id+`">`+itm.name+`</option>`;
    }
    $("#t_type").append(html);
    $("#t_type").selectpicker("refresh");
}

$("#p_selectlab").on('change', function () {
    selectedPetId = $("#p_selectlab").val();
    for(let i = 0; i < pets.length; i++) {
        if (parseInt(selectedPetId) === pets[i].id) {
            selectedPet = pets[i];
        }
    }
    setCardData();
});

$("#t_type").on('change', function () {
    selectedTypeId = $("#t_type").val();
    for(let i = 0; i < types.length; i++) {
        if (parseInt(selectedTypeId) === types[i].id) {
            selectedType = types[i];
        }
    }
});

function setCardData() {

    let has_spayed;
    if(selectedPet.has_spayed){
        has_spayed = "Kisir";
    }else{
        has_spayed = "Kisir Degil";
    }

    $("#lab_p_name").text(selectedPet.name);
    $("#lab_p_chipno").text(selectedPet.chipno);
    $("#lab_p_cardno").text(selectedPet.cardno);
    $("#lab_p_birthdate").text(selectedPet.birthdate.slice(0,10));
    $("#lab_p_color").text(selectedPet.color);
    $("#lab_p_has_spayed").text(has_spayed);
    $("#lab_p_race").text(selectedPet.race.name);
    $("#lab_p_spec").text(selectedPet.spec.name);
    $("#lab_p_gender").text(selectedPet.gender.name);

}

$('#test_add_form').submit( ( event ) => {
    event.preventDefault();

    const t_result = $("#t_result").val();

    const obj = {
        no: codeGenerator(),
        pet: selectedPet,
        type: selectedType,
        result: t_result
    }

    $.ajax({
        url: '/lab/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType : 'application/json; charset=utf-8',
        success: function (data) {
                console.log(data);
                $('#test_add_form').trigger("reset");
                createRow();

        },
        error: function (err) {
            console.log(err)
            alert("Ýþlem iþlemi sýrýsýnda bir hata oluþtu!");
        }
    })
})

function codeGenerator() {
    const date = new Date();
    const time = date.getTime();
    return time.toString().substring(3);
}


getAllPets();
getTestTypes();