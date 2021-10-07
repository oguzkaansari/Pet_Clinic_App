let customers = [];
let selectedCustomerId  = 0;
let selectedPetId = 0;
function getAllCustomers() {

    $.ajax({
        url: '/customer/all',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            customers = data;
            createCustomerSelect();
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function createCustomerSelect() {

    let html = ``;
    for (let i = 0; i < customers.length; i++) {
        const itm = customers[i];
        html += `<option value="`+itm.id+`" data-subtext="`+itm.no+`">`+itm.name+ " " +itm.surname+ `</option>`;
    }
    $("#c_select").append(html);
    $("#c_select").selectpicker("refresh");
}

function createPetSelect() {

    console.log(selectedCustomerId)
    let html = ``;
    for (let i = 0; i < customers.length; i++) {
        if(parseInt(selectedCustomerId) === customers[i].id){
            for (let k = 0; k < customers[i].pets.length; k++) {
                const itm = customers[i].pets[k];
                html += `<option value="`+itm.id+`" data-subtext="`+itm.cardno+`" >`+itm.name+`</option>`;
            }
        }
    }
    $("#p_select").append(html);
    $("#p_select").selectpicker("refresh");

}

function resetSelect(select_id) {
    let select = document.getElementById(select_id);
    for (let i=1; i < select.length; i++) {
        select.remove(i);
        i--;
    }
}

$("#c_select").on('change', function() {

    resetSelect("p_select");
    selectedCustomerId = $("#c_select").val();
    createPetSelect();

});

$("#p_select").on('change', function() {
    selectedPetId = $("#p_select").val();
});

$('#meeting_add_form').submit( ( event ) => {
    event.preventDefault();

    const date = $("#m_date").val();

    const custObj = {
        id: selectedCustomerId
    }

    const petObj = {
        id: selectedPetId
    }

    const obj = {
        customer: custObj,
        pet: petObj,
        date: date
    }

    $.ajax({
        url: '/calendar/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType : 'application/json; charset=utf-8',
        success: function (data) {
            if ( data !== "0" ) {
                console.log(data);
                alert("Islem basarili");
            }else {
                alert("Ýþlem sýrasýnda hata oluþtu!");
            }
        },
        error: function (err) {
            console.log(err)
            alert("Ýþlem iþlemi sýrýsýnda bir hata oluþtu!");
        }
    })
})

getAllCustomers();



