function getRoles() {

    $.ajax({
        url: '/admin/roles',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createRoleSelect(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function createRoleSelect(data) {

    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<option value="`+itm.id+`">`+itm.title+`</option>`;
    }
    $("#role").append(html);
}
getRoles();

function testImage(fileUpload) {

    console.log(fileUpload)
    let regex = new RegExp("([a-zA-Z0-9\s_\.\-:])+(.jpg|.png|.gif)$");
    if (regex.test(fileUpload.name.toLowerCase())) {

        if (typeof fileUpload != "undefined") {
            const reader = new FileReader();
            reader.readAsDataURL(fileUpload);
            reader.onload = function (e) {

                const image = new Image();
                image.src = e.target.result;

                image.onload = function () {
                    if (this.height > 200 ||  this.width > 200) {

                        alert("Genislik : " + this.width + "\r\n" + "Yukseklik : " + this.height + "\r\n" + "Genislik ve yukseklik 200 pikselden fazla olmamali");
                        return false;
                    }
                    return true;
                };

            }
        } else {
            alert("This browser does not support HTML5.");
            return false;
        }
    } else {
        alert("Please select a valid Image file.");
        return false;
    }
}

$(document).on('change','#img' , function(){

    if(testImage(this.files[0]) === true){
        document.getElementById('imgPreview').src = window.URL.createObjectURL(this.files[0]);
    }else{
        $('#img').val("");
    }

});

/*
$('#user_register_form').submit( ( event ) => {
    event.preventDefault();

    const name = $("#name").val();
    const phone = $("#phone").val();
    const img = $("#img").val();
    const mail = $("#mail").val();

    let status_id;
    if ($('#status').is(":checked"))
    {
        status_id = 1;
    }else{
        status_id = 2;
    }

    const statusObj = {
        id: status_id
    }

    const roleIndex = document.getElementById("role").selectedIndex;
    if(roleIndex === 0){
        alert("Lutfen rol seciniz!");
        return;
    }
    const roleObj = {
        id: document.getElementById("role").options[roleIndex].value
    }

    const obj = {
        name: name,
        phone: phone,
        img: img,
        mail: mail,
        status: statusObj,
        role: roleObj
    }

    $.ajax({
        url: '/admin/register',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType : 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
            if ( data !== 0 ) {
                createRow();
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
*/
