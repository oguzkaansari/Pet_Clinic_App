function getUsers() {

    $.ajax({
        url: '/admin/users',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createRow(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function createRow(data) {
    console.log(data)
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
                    <td><img src="src/main/resources/static/uploads/`+itm.img+`" alt=""></td>
                    <td>`+itm.name+`</td>
                    <td>`+itm.phone+`</td>
                    <td>`+itm.email+`</td>
                    <td>`+itm.role.title+`</td>
                    <td>`+itm.status.name+`</td>
                    <td class="text-right">
                        <div class="btn-group" role="group"">
                            <button onclick="" type="button" class="btn default-button"><i class="far fa-pencil-alt"></i></button>
                            <button onclick="deleteUser(`+itm.id+`)" type="button" class="btn red-button"><i class="far fa-trash-alt"></i></button>
                        </div>
                    </td>  
                    </tr>`;

    }
    $('#tBodyUsers').html(html);
}

function deleteUser(id) {
    let answer = confirm("Secilen kullaniciyi silmek istediginizden emin misniz?");

    if(answer){
        $.ajax({
            url: '/admin/delete/' + id,
            type: 'DELETE',
            dataType: 'JSON',
            contentType : 'application/json; charset=utf-8',
            success: function (data) {
                console.log(data)
                if ( data === 1 ) {
                    console.log(data);
                    getAllCustomers();
                }else {
                    alert("Ýþlem sýrasýnda hata oluþtu!");
                }
            },
            error: function (err) {
                console.log(err)
                alert("Silme iþlemi sýrýsýnda bir hata oluþtu!");
            }
        })
    }
}

getUsers();