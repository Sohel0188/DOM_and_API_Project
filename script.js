const search = (event) => {
    const search_value = document.getElementById("searchPlayer");
    const query = search_value.value;
    search_value.value = "";

    //console.log(search_value)
    fetch(`http://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${query}`)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            viewSearchData(data.player)
            detailsContainer.innerHTML = '';
        })
}
const viewSearchData = (players) => {

    const SearchList = document.getElementById("search_result");
    SearchList.innerHTML = '';
    players.forEach(player => {
        console.log('player')
        const div = document.createElement("div");
        div.classList.add("searchCard");
        if (player.strThumb == null) {
            player.strThumb = "image/profile-default.png";
        }
        const instagramLink = `https://${player.strInstagram}`;
        const facebookLink = `https://${player.strFacebook}`;
        const twitterLink = `https://${player.strTwitter}`;
        console.log(instagramLink);
        div.innerHTML = `         
          <img src="${player.strThumb}" alt="Image Not found">
          <h3>${player.strPlayer}</h3>
          <p class="role">${player.strSport}</p>
          <div class="details">
              <table class="value-table" width = "100%">
                  <tr>
                      <td width="33%" >ID</td>
                   
                      <td width="33%">Gender</td>
                    
                      <td width="33%">City</td>
                      
                  </tr>
                  <tr>
                      <td width="33%">${player.idPlayer}</td>
                      <td width="33%">${player.strGender}</td>
                      <td width="33%">${player.strNationality}</td>
                  </tr>
                  
              </table>
          </div>
          <hr>

          <div class="social-icons">
          <a href="${facebookLink}"><i class="fa-brands fa-facebook"></i></a>
          <a href="${instagramLink}"><i class="fa-brands fa-instagram"></i></a>
          <a href="${twitterLink}"><i class="fa-brands fa-x-twitter"></i></a> 
          </div>
          <button class="view-profile" onclick = "playerDetails('${player.idPlayer}')" data-bs-toggle="modal" data-bs-target="#exampleModal"> View profile </button>
          <button id="addMember${player.idPlayer}" onclick = "addToCart('${player.strThumb}','${player.strPlayer}','${player.idPlayer}')" class="add-member">Member Add</button>
      `
        SearchList.appendChild(div);
    });

}
fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=D")
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        viewAllPlayer(data.player);
    })


const viewAllPlayer = (players) => {

    const payerList = document.getElementById("players-list");
    players.forEach(player => {

        console.log('player')
        const div = document.createElement("div");
        div.classList.add("player-card");
        if (player.strThumb == null) {
            player.strThumb = "image/profile-default.png";
        }
        const instagramLink = `http://${player.strInstagram}`;
        const facebookLink = `http://${player.strFacebook}`;
        const twitterLink = `http://${player.strTwitter}`;
        div.innerHTML = `
            
            <img src="${player.strThumb}" alt="Image Not found">
            <h3>${player.strPlayer}</h3>
            <p class="role">${player.strSport}</p>
            <div class="details">
                <table class="value-table" width = "100%">
                    <tr>
                        <td width="33%" >ID</td>
                     
                        <td width="33%">Gender</td>
                      
                        <td width="33%">City</td>
                        
                    </tr>
                    <tr>
                        <td width="33%">${player.idPlayer}</td>
                        <td width="33%">${player.strGender}</td>
                        <td width="33%">${player.strNationality}</td>
                    </tr>
                    
                </table>
            </div>
            <hr>
            <div class="social-icons">
                <a href="${facebookLink}" ><i class="fa-brands fa-facebook"></i></a>
                <a href="${instagramLink}" ><i class="fa-brands fa-instagram"></i></a>
                <a href="${twitterLink}"><i class="fa-brands fa-x-twitter"></i></a>
            </div>
            <button class="view-profile" onclick = "playerDetails('${player.idPlayer}')" data-bs-toggle="modal" data-bs-target="#exampleModal"> View profile </button>
            <button class="add-member" id="addMember${player.idPlayer}"
            onclick="addToCart('${player.strThumb}','${player.strPlayer}','${player.idPlayer}')"> Member Add </button>
        `
        // console.log(player.strThumb);
        // console.log(player.strPlayer);
        payerList.appendChild(div);
    });

}
let cartCount = 0; // Initialize the cart counter
const maxCartCount = 11; // Maximum number of members allowed in the cart

const addToCart = (playerImage, playerName, playerId) => {
    if (cartCount >= maxCartCount) {
        console.log("Cannot add more than 11 members to the cart.");
        alert("Cannot add more than 11 members to the cart.");
        return; // Do not add more members
    }
    const buttonTxt = document.getElementById(`addMember${playerId}`).innerText
    if (buttonTxt == "Member Added") {
        alert("Already Added Member");
        return;
    }
    console.log(buttonTxt);
    const cartContainer = document.getElementById("cart-container")
    const div = document.createElement("div")
    div.classList.add("cartData");
    div.innerHTML = `
        <table class="table">
            <tr>
                <td><img class="cartImage"src="${playerImage}" alt="img" width='30'></td>
                <td>${playerName}</td>

            </tr>
        </table>
    `
    document.getElementById(`addMember${playerId}`).innerText = "Member Added"
    const btncolor = document.getElementById(`addMember${playerId}`)
    btncolor.style.backgroundColor = "#931321";
    cartContainer.appendChild(div);

    cartCount = cartCount + 1;
}

const playerDetails = (PlayerId) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${PlayerId}`)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            const player = data.players[0];
            console.log(player.strPlayer)
            const modalBody = document.getElementById("modal-body");
            if (player.strThumb == null) {
                player.strThumb = "image/profile-default.png";
            }
            modalBody.innerHTML = '';
            const div = document.createElement("div")
            div.classList.add("details_details");
            div.innerHTML = `
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-3 modalImg">
                        <img src="${player.strThumb}" alt="imd">
                    </div>
                    <div class="col-md-9">
                       
                       <table class="table">
                            <tr>                               
                                <td width=35%>Name</td>
                                <td width=1%>:</td>
                                <td width=80%>${player.strPlayer}</td>
                            </tr>
                            <tr>                               
                                <td width=30%>Date of Birth</td>
                                <td width=1%>:</td>
                                <td width=80%>${player.dateBorn}</td>
                            </tr>
                            <tr>                               
                                <td width=30%>Nationality</td>
                                <td width=1%>:</td>
                                <td width=80%>${player.strNationality}</td>
                            </tr>
                            <tr>                               
                                <td width=30%>Team</td>
                                <td width=1%>:</td>
                                <td width=80%>${player.strTeam}</td>
                            </tr>
                            <tr>                               
                                <td width=40%>Sport</td>
                                <td width=1%>:</td>
                                <td width=59%>${player.strSport}</td>
                            </tr>
                            <tr>                               
                                <td width=30%>Playing Position</td>
                                <td width=1%>:</td>
                                <td width=80%>${player.strPosition}</td>
                            </tr>

                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-12 bg-red">
                <p class="playerDic">${player.strDescriptionEN}<p>
            </div>
            
            `
            modalBody.appendChild(div)
        });
}