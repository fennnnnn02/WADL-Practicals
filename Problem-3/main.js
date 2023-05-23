function DisplayData() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let html = ` <center>
    <table border='2px'>
        <thead>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Roll no
                </th>
                
            </tr>
        </thead>
        <tbody>
    `;
    users.forEach(element => {
        html += `
            <tr>
                <td>${element?.name}</td>
                <td>${element?.roll}</td>
                
            </tr>
        `
    })

    html += '</tbody> </table></center>';

    const w = open()
    w.document.body.innerHTML = html;
}

function addAndDisplayData(data) {
    let arr = JSON.parse(localStorage.getItem('users')) || []; 
    arr.unshift(data); 
    localStorage.setItem('users', JSON.stringify(arr));
    DisplayData();
}

document.forms.registrationForm.addEventListener("submit", formSubmit)

function formSubmit(event) {
    event.preventDefault();

    let name = $('#name').val();
    let roll = $('#rollno').val();

    let postObj = { name, roll };

    $.ajax({
        type: 'POST',
        url: 'https://jsonplaceholder.typicode.com/users',
        data: JSON.stringify(postObj),
        contentType: "application/json",

        success: function (newUser) {
            addAndDisplayData(postObj)
        },
        error: function (error) {
            console.log(error)
            addAndDisplayData(postObj)
        }
    });

}