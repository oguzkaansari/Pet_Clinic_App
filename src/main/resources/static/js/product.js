function getAllProducts() {

    $.ajax({
        url: '/product/all',
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
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
                        <td>`+itm.name+`</td>
                        <td>`+itm.unit.name+`</td>
                        <td>`+itm.type.name+`</td>
                        <td>`+itm.barcode+`</td>
                        <td>`+itm.code+`</td>
                        <td>`+itm.tax.amount+`</td>
                        <td>`+itm.buy_price+`</td>
                        <td>`+itm.sell_price+`</td>
                        <td>`+itm.category.name+`</td>          
                        <td>`+itm.stock+`</td>          
          </tr>`;
    }
    $('#tBodyProducts').html(html);
}

function getCategories() {

    $.ajax({
        url: '/specifications/category/all',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createCategorySelect(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function getUnits() {

    $.ajax({
        url: '/product/units',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createUnitSelect(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function getTypes() {

    $.ajax({
        url: '/product/types',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createTypeSelect(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function getSuppliers() {

    $.ajax({
        url: '/supplier/all',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createSupplierSelect(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function getTaxes() {

    $.ajax({
        url: '/product/taxes',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createTaxSelect(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function createCategorySelect(data) {

    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<option value="`+itm.id+`">`+itm.name+`</option>`;
    }
    $("#p_category").append(html);
}

function createUnitSelect(data) {

    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<option value="`+itm.id+`">`+itm.name+`</option>`;
    }
    $("#pr_unit").append(html);
}

function createTypeSelect(data) {

    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<option value="`+itm.id+`">`+itm.name+`</option>`;
    }
    $("#pr_type").append(html);
}

function createSupplierSelect(data) {

    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<option value="`+itm.id+`">`+itm.name+`</option>`;
    }
    $("#pr_supplier").append(html);
}

function createTaxSelect(data) {

    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<option value="`+itm.id+`">`+itm.amount+`</option>`;
    }
    $("#pr_tax").append(html);
}


getAllProducts();
getCategories();
getUnits();
getTypes();
getSuppliers();
getTaxes();

$('#product_add_form').submit( ( event ) => {
    event.preventDefault();

    const pr_name = $("#pr_name").val();
    const pr_barcode = $("#pr_barcode").val();
    const pr_code = $("#pr_code").val();
    const pr_buy_price = $("#pr_buy_price").val();
    const pr_sell_price = $("#pr_sell_price").val();
    const pr_stock = $("#pr_stock").val();
    const pr_crit_stock = $("#pr_crit_stock").val();

    const unitIndex = document.getElementById("pr_unit").selectedIndex;
    const unitObj = {
        id: document.getElementById("pr_unit").options[unitIndex].value,
    }

    const catIndex = document.getElementById("p_category").selectedIndex;
    const catObj = {
        id: document.getElementById("p_category").options[catIndex].value,
    }

    const typeIndex = document.getElementById("pr_type").selectedIndex;
    const typeObj = {
        id: document.getElementById("pr_type").options[typeIndex].value,
    }

    const supIndex = document.getElementById("pr_supplier").selectedIndex;
    const supObj = {
        id: document.getElementById("pr_supplier").options[supIndex].value,
    }

    const taxIndex = document.getElementById("pr_tax").selectedIndex;
    const taxObj = {
        id: document.getElementById("pr_tax").options[taxIndex].value,
    }

    const obj = {
        name: pr_name,
        barcode: pr_barcode,
        code: pr_code,
        buy_price: pr_buy_price,
        sell_price: pr_sell_price,
        stock: pr_stock,
        crit_stock: pr_crit_stock,
        unit: unitObj,
        category: catObj,
        type: typeObj,
        supplier: supObj,
        tax: taxObj,

    }

    $.ajax({
        url: '/product/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType : 'application/json; charset=utf-8',
        success: function (data) {
            if ( data !== "0" ) {
                console.log(data);
                alert("Islem basarili oldu");
                $('#product_add_form').trigger("reset");
                getAllProducts();
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
