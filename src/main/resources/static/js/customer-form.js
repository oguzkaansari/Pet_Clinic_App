let c_id = 0;
let p_list = [];
let race_list = [];

function setData(data) {

    console.log("fdf");
    c_id = data.id;
    $("#c_name").text(data.name);
    $("#c_surname").text(data.surname);
    $("#c_phone1").text(data.phone1);
    $("#c_phone2").text(data.phone2);
    $("#c_email").text(data.email);
    $("#c_taxname").text(data.taxname);
    $("#c_taxno").text(data.taxno);
    $("#c_city").text(data.city);
    $("#c_district").text(data.district);
    $("#c_address").text(data.address);
    $("#c_note").text(data.note);
    $("#c_discount").text(data.discount);

    p_list = data.pets;
    createRow();
}

function createRow() {
    let html = ``;
    for (let i = 0; i < p_list.length; i++) {
        const itm = p_list[i];
        html += `<tr role="row" class="odd">
            <td>`+itm.name+`</td>
            <td>`+itm.chipno+`</td>
            <td>`+itm.cardno+`</td>
            <td>`+itm.race.name+`</td>
            <td>`+itm.spec.name+`</td>
            <td>`+itm.color+`</td>
            <td>`+itm.gender.name+`</td>
            <td>`+itm.has_spayed+`</td>            
            <td>`+itm.birthdate+`</td>`;

        if(itm.id !== null || true){
            html += `<td class="text-right">
                          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button onclick="updatePet(\`+itm.id+\`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
                            <button onclick="deletePet(`+itm.id+`, this.parentNode.parentNode.parentNode)" type="button" class="btn red-button"><i class="far fa-trash-alt"></i></button>
                          </div>
                    </td>`;
        }else{
            html += `<td class="text-right">
                          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button onclick="deleteFromTable(`+i+`)" type="button" class="btn red-button"><i class="far fa-trash-alt"></i></button>
                          </div>
                     </td>`;
        }
        html += `</tr>`;
    }
    $('#tBodyPets').html(html);
}

function deletePet(tr) {
    index = tr.rowIndex;
    for( let i = 0; i < indentArr.length; i++){

        if ( i === index-1) {
            p_list.splice(i, 1);
            createRow();
            break;
        }
    }
}



$('#customer_add_form').submit( ( event ) => {
    event.preventDefault();

    const c_name = $("#c_name").val();
    const c_surname = $("#c_surname").val();
    const c_phone1 = $("#c_phone1").val();
    const c_phone2 = $("#c_phone2").val();
    const c_mail = $("#c_mail").val();
    const c_taxname = $("#c_taxname").val();
    const c_taxno = $("#c_taxno").val();
    const c_city = $("#c_city").val();
    const c_district = $("#c_district").val();
    const c_address = $("#c_address").val();
    const c_note = $("#c_note").val();
    const c_group = $("#c_group").val();
    let c_discount = $("#c_discount").val();

    if(c_discount === null){
        c_discount = 0;
    }

    const obj = {
        no: codeGenerator(),
        name: c_name,
        surname: c_surname,
        phone1: c_phone1,
        phone2: c_phone2,
        mail: c_mail,
        taxno: c_taxno,
        taxname: c_taxname,
        city: c_city,
        district: c_district,
        address: c_address,
        note: c_note,
        group: c_group,
        discount: c_discount,
        pets: p_list
    }

    if ( c_id !== 0 ) {
        // update
        obj["id"] = c_id;
    }
    $.ajax({
        url: '/customer/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType : 'application/json; charset=utf-8',
        success: function (data) {

            if ( data === 1 ) {
                alert("Islem Basarili")
                $('#customer_add_form').trigger("reset");
            }else if (data === 0){
                alert("Her musterinin en az bir hastasi olmali!");
            }else{
                alert("Validation hatasi!")
                console.log(data);
            }
        },
        error: function (err) {
            console.log(err)
            alert("Ýþlem sýrýsýnda bir hata oluþtu!");
        }
    })
})

$('#pet_add_form').submit( ( event ) => {
    event.preventDefault();

    const p_name = $("#p_name").val();
    const p_birthdate = $("#p_birthdate").val();
    const p_chipno = $("#p_chipno").val();
    const p_color = $("#p_color").val();
    const p_cardno = $("#p_cardno").val();

    let p_has_spayed = false;
    if ($('#p_has_spayed').is(":checked"));
    {
        p_has_spayed = true;
    }

    const raceIndex = document.getElementById("p_race").selectedIndex;
    const raceObj = {
        id: document.getElementById("p_race").options[raceIndex].value,
        name: document.getElementById("p_race").options[raceIndex].text
    }

    const specIndex = document.getElementById("p_spec").selectedIndex;
    const specObj = {
        id: document.getElementById("p_spec").options[specIndex].value,
        name: document.getElementById("p_race").options[specIndex].text

    }

    const genderRadioVal = $('input[name="p_gender"]:checked').val();
    const g_id = parseInt(genderRadioVal);
    let g_name;
    if(g_id === 1){
        g_name = "Diþi";
    }
    if(g_id === 2){
        g_name = "Erkek";
    }
    const genderObj = {
        id: g_id,
        name: g_name
    }

    const obj = {
        name: p_name,
        birthdate: p_birthdate,
        spec: specObj,
        chipno: p_chipno,
        race: raceObj,
        color: p_color,
        cardno: p_cardno,
        has_spayed: p_has_spayed,
        gender: genderObj
    }
    p_list.unshift(obj);
    createRow()
    $('#pet_add_form').trigger("reset");

})

function getAllGroups() {

    $.ajax({
        url: '/specifications/group/all',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createGroupSelect(data);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function createGroupSelect(data) {

    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<option value="`+itm.id+`">`+itm.name+`</option>`;
    }
    $("#c_group").append(html);

}

function getAllRaces() {

    $.ajax({
        url: '/customer/races',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            race_list = data;
            createRaceSelect(data);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function createRaceSelect(data) {

    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<option id="`+itm.id+`" value="`+itm.id+`">`+itm.name+`</option>`;
    }
    $("#p_race").append(html);

}

$("#p_race").on('change', function() {

    resetSelect("p_spec");
    createSpecSelect(this.value);
});

function createSpecSelect(id) {
    console.log(id);
    console.log(race_list);

    let html = ``;
    for (let i = 0; i < race_list.length; i++) {
        if(parseInt(id) === race_list[i].id){
            for (let k = 0; k < race_list[i].specs.length; k++) {
                const itm = race_list[i].specs[k];
                html += `<option id="`+itm.id+`" value="`+itm.id+`">`+itm.name+`</option>`;
            }
        }
    }
    $("#p_spec").append(html);

}

function resetSelect(select_id) {
    let select = document.getElementById(select_id);
    for (let i=1; i < select.length; i++) {
        select.remove(i);
        i--;
    }
}

function getGenders() {
    $.ajax({
        url: '/customer/genders',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createGenderRadioSelect(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function createGenderRadioSelect(data) {
    let html = `<label class="form-label">Cinsiyeti</label>`;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += ` <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="p_gender" value="`+itm.id+`" id="gender`+itm.id+`">
                        <label class="form-check-label" for="gender`+itm.id+`">`+itm.name+`</label>
                      </div>
                      `;
    }
    $("#genderRadioDiv").append(html);
}

function codeGenerator() {
    const date = new Date();
    const time = date.getTime();
    return time.toString().substring(3);
}

getAllGroups();
getAllRaces();
getGenders();