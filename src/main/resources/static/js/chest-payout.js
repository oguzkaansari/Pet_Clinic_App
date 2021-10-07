let tickets = [];
let selectedTicket = {};
function getTickets() {

    $.ajax({
        url: '/chest/tickets/' + 2,
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            tickets = data;
            createTicketSelect();
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function createTicketSelect() {

    let html = ``;
    for (let i = 0; i < tickets.length; i++) {
        const itm = tickets[i];
        html += `<option value="`+itm.id+`" data-subtext="`+itm.supplier.name+`">`+itm.no+`</option>`;
    }
    $("#t_select").append(html);
    $("#t_select").selectpicker("refresh");
}

$("#t_select").on('change', function () {
    const id = $("#t_select").val();
    for(let i = 0; i < tickets.length; i++) {
        if (parseInt(id) === tickets[i].id) {
            selectedTicket = tickets[i];
        }
    }
    $("#t_price").text(selectedTicket.price);
    $("#t_no").text(selectedTicket.no);
    createRow();
});

getTickets();