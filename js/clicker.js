//initialize program
var money = 0;
var money_perclick = 1;
var money_lvl = 1;
var moneyupg_cost = 1;
var money_thisuniverse = 0;
var money_total = 0;
var universe = 1;
var feature = 0; //0=game start 1=auto production
var featurethresholds = [12000, Infinity];
var featuredesc = ["Auto Production", "Congratulations! You broke the game!"]
var money_persecond = 0;

function gameupdate() {
    document.getElementById("money").innerHTML = "$" + money;
    document.getElementById("moneyadd").innerHTML = "$$$ (+" + money_perclick + ")";

    moneyupg_cost = Math.ceil(Math.pow(money_lvl, 4.5));
    document.getElementById("moneyupg").innerHTML = "Upgrade money per click (x2, cost: " + moneyupg_cost + ")";
    document.getElementById("universereset").innerHTML = "Reset the universe! Next feature: " + featuredesc[feature] + " at $" + featurethresholds[feature]

    if (feature > 0) {
        money_persecond = Math.floor(money_perclick * 0.1);
    }
}
setInterval(gameupdate, 200);
//add event listeners
document.getElementById("moneyadd").addEventListener("click", moneyaddonclick);
document.getElementById("moneyupg").addEventListener("click", moneyupgonclick);
document.getElementById("universereset").addEventListener("click", universeresetonclick);


//button behavior
function moneyaddonclick() {
    money += money_perclick;
    money_thisuniverse += money_perclick;
    money_total += money_perclick;
}

function moneyupgonclick() {
    if (money >= moneyupg_cost) {
        money_lvl += 1;
        money_perclick = 2 * money_perclick;
        money -= moneyupg_cost;
        gameupdate();
    }
}

function universeresetonclick() {
    if (prompt("Are you really sure you want to reset? Type yes to continue...") == "yes") {
        if (money >= featurethresholds[feature]) {
            feature += 1;
        }
        universe += 1;
        money = 0;
        money_perclick = 1;
        money_lvl = 1;
        moneyupg_cost = 1;
        money_thisuniverse = 0;

    }
}
