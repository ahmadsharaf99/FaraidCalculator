// Initialize the shares
var sons_shares = 0;
var daughters_shares = 0;
var mother_share = 0;
var father_share = 0;
var brother_share = 0;
var sister_share = 0;
var wives_share = 0;
var individual_share = 0;
var one_third_PRS = 0; 
var half_PRS = 0;
var rem_aft_dau_share = 0;
var rem_aft_wif = 0;
var rem_share = 0;

function handleComputation() {
    let total_share = parseInt(document.getElementById("t_share").value) || 0;
    let bequest_share = parseInt(document.getElementById("b_share").value) || 0;
    let num_of_sons = parseInt(document.getElementById("sons").value) || 0;
    let num_of_daugthers = parseInt(document.getElementById("daughters").value) || 0;
    let father = parseInt(document.getElementById("father").value) || 0;
    let mother = parseInt(document.getElementById("mother").value) || 0;
    let num_of_bro = parseInt(document.getElementById("brothers").value) || 0;
    let num_of_sis = parseInt(document.getElementById("sisters").value) || 0;
    let num_of_wives = parseInt(document.getElementById("wives").value) || 0;   

    // Output doc selector variables
    let son_share_out = document.getElementById("son_share");
    let dau_share_out = document.getElementById("dau_share");
    let mother_share_out = document.getElementById("mother_share");
    let father_share_out = document.getElementById("father_share");
    let bro_share_out = document.getElementById("bro_share");
    let sis_share_out = document.getElementById("sis_share");
    let wif_share_out = document.getElementById("wives_share");
    let rem_share_out = document.getElementById("rem_share");

    let total_PRS = total_share - bequest_share;


    /* PRESCRIBED SHARES COMPUTATION */
    // Determine if there are children's shares
    if (num_of_sons > 0) {
        // wives shares
        wives_share = (num_of_wives > 0 ? (1 / 8) * total_PRS : 0);
        rem_aft_wif = total_PRS - wives_share;
        // sons shares
        sons_shares = num_of_sons * (2 * (rem_aft_wif / (2 * num_of_sons + num_of_daugthers)));
        // daughters shares
        daughters_shares = (num_of_daugthers > 0 ? num_of_daugthers * (rem_aft_wif / (2 * num_of_sons + num_of_daugthers)) : 0);        
    } 
    else if (num_of_sons == 0 && num_of_daugthers >= 2) {
        // wives shares
        daughters_shares = 2 * (total_PRS / 3);

        rem_aft_dau_share = total_PRS - daughters_shares;
        mother_share = (mother == 1 ? (1 / 6) * rem_aft_dau_share : 0);
        father_share = (father == 1 ? (1 / 6) * rem_aft_dau_share : 0);
        wives_share = (num_of_wives > 0 ? (1 / 8) * rem_aft_dau_share : 0);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 1) {
        daughters_shares = total_PRS / 2;

        rem_aft_dau_share = total_PRS - daughters_shares;
        mother_share = (mother == 1 ? (1 / 6) * rem_aft_dau_share : 0); 
        father_share = (father == 1 ? (1 / 6) * rem_aft_dau_share : 0);
        wives_share = (num_of_wives > 0 ? (1 / 8) * rem_aft_dau_share : 0); 
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && num_of_bro == 0 && num_of_sis == 0) {
        mother_share = (mother == 1 ? (1 / 3) * total_PRS : 0);
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        father_share = total_PRS - (mother_share + (wives_share *   num_of_wives));
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 1 && (num_of_bro + num_of_sis) >= 2) {
        mother_share = (1 / 6) * total_PRS;
        one_third_PRS = (1 / 3) * total_PRS;
        
        brother_share = num_of_bro * (2 * (one_third_PRS / (2 * num_of_bro + num_of_sis)));
        sister_share = num_of_sis * (one_third_PRS / (2 * num_of_bro + num_of_sis));
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        mother_share += total_PRS - (mother_share  + brother_share + sister_share + (wives_share * num_of_wives ));
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 1 && num_of_bro == 1 && num_of_sis == 0) {
        mother_share = (1 / 3) * total_PRS;
        brother_share = (1 / 6) * total_PRS;
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        mother_share += total_PRS - (mother_share + brother_share + (wives_share * num_of_wives)); 
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 1 && num_of_bro == 0 && num_of_sis == 1) {
        mother_share = (1 / 3) * total_PRS;
        sister_share = (1 / 6) * total_PRS;
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        mother_share += total_PRS - (mother_share + sister_share + (wives_share * num_of_wives));
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro == 0 && num_of_sis == 1) {
        sister_share = (1 / 2) * total_PRS;
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro >= 1 && num_of_sis == 0) {
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        brother_share = total_PRS - (wives_share * num_of_wives); 
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro == 0 && num_of_sis >= 2) {
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        rem_aft_wif = total_PRS - (wives_share * num_of_wives);        
        sister_share = (2 / 3) * rem_aft_wif;
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro > 0 && num_of_sis > 0) {
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        rem_aft_wif = total_PRS - (wives_share * num_of_wives);

        brother_share = num_of_bro * (2 * (rem_aft_wif / (2 * num_of_bro + num_of_sis)));
        sister_share = num_of_sis * (rem_aft_wif / (2 * num_of_bro + num_of_sis));
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 1 && num_of_bro == 0 && num_of_sis == 0) {
        mother_share = (1 / 3) * total_PRS;
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        mother_share += total_PRS - (mother_share + (wives_share * num_of_wives));
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro == 0 && num_of_sis == 0) {
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 1 && (num_of_bro + num_of_sis) >= 2) {
        mother_share = (1 / 6) * total_PRS;
        one_third_PRS = (1 / 3) * total_PRS;
        brother_share = num_of_bro * (2 * (one_third_PRS / (2 * num_of_bro  + num_of_sis)));
        sister_share = num_of_sis* (one_third_PRS/ (2 * num_of_bro  + num_of_sis));
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        father_share = total_PRS - (mother_share + brother_share + sister_share + (wives_share * num_of_wives));
    } 
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 1 && num_of_bro == 1 && num_of_sis == 0) {
        mother_share = (1 / 3) * total_PRS;
        brother_share = (1 / 6) * total_PRS;
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        father_share = total_PRS - (mother_share + brother_share + (wives_share * num_of_wives));
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 1 && num_of_bro == 0 && num_of_sis == 1) {
        mother_share = (1 / 3) * total_PRS;
        sister_share = (1 / 6) * total_PRS;
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        father_share = total_PRS - (mother_share + sister_share + (wives_share * num_of_wives));
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 0 && (num_of_bro + num_of_sis) >= 2) {
        one_third_PRS = (1 / 3) * total_PRS; 
        brother_share = num_of_bro * (2 * (one_third_PRS / (2 * num_of_bro + num_of_sis)));
        sister_share = num_of_sis * (one_third_PRS / (2 * num_of_bro + num_of_sis));
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        father_share = total_PRS - (brother_share + sister_share + (wives_share * num_of_wives ));
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 0 && num_of_bro == 1 && num_of_sis == 0) {
        brother_share = (1 / 6) * total_PRS;
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        father_share = total_PRS - (mother_share + brother_share + (wives_share * num_of_wives));
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 0 && num_of_bro == 0 && num_of_sis == 1) {
        sister_share = (1 / 6) * total_PRS;
        half_PRS = total_PRS / 2;
        wives_share = (num_of_wives > 0 ? (1 / 4) * half_PRS : 0);
        father_share += total_PRS - (sister_share + (wives_share * num_of_wives));
    }

    rem_share = total_PRS - (sons_shares + daughters_shares + mother_share + father_share + wives_share + brother_share + sister_share);

    // =========================
    // Heirs' Shares Rendering
    // =========================

    // Sons Shares Rendering
    if (sons_shares > 0) {
        son_share_out.style.color = "red";
        individual_share = sons_shares / num_of_sons;
    }
    else { son_share_out.style.color = "black"; }

    if (sons_shares > 0) {
        son_share_out.innerHTML = Math.round(individual_share * 100) / 100 + 
        (num_of_sons > 1 ? " x " + num_of_sons + "<br> (" + Math.round(sons_shares * 100) / 100 + ")" : ""); 
    }
    else {
        son_share_out.innerHTML = 0;
    }

    // Daughters Shares Rendering
    if (daughters_shares > 0) {
        dau_share_out.style.color = "red";
        individual_share = daughters_shares / num_of_daugthers;
    }
    else { dau_share_out.style.color = "black"; }

    if (daughters_shares > 0) {
        dau_share_out.innerHTML = Math.round(individual_share * 100) / 100 + 
        (num_of_daugthers > 1 ? " x " + num_of_daugthers + "<br> (" + Math.round(daughters_shares * 100) / 100 + ")" : ""); 
    }
    else {
        dau_share_out.innerHTML = 0;
    }

    // Mother's Shares Rendering
    if (mother_share > 0) {
        mother_share_out.style.color = "red";
    }
    else { mother_share_out.style.color = "black"; }
    mother_share_out.innerHTML = Math.round(mother_share * 100) / 100;

    // Father's Shares Rendering
    if (father_share > 0) {
        father_share_out.style.color = "red";
    }
    else { father_share_out.style.color = "black"; }
    father_share_out.innerHTML = Math.round(father_share * 100) / 100;

    // Brother's Shares Rendering
    if (brother_share > 0) {
        bro_share_out.style.color = "red";
        individual_share = brother_share / num_of_bro;
    }
    else { bro_share_out.style.color = "black"; }

    if (brother_share > 0) {
        bro_share_out.innerHTML = Math.round(individual_share * 100) / 100 + 
        (num_of_bro > 1 ? " x " + num_of_bro + "<br> (" + Math.round(brother_share * 100) / 100 + ")" : ""); 
    }
    else {
        bro_share_out.innerHTML = 0;
    }

    // Sister's Shares Rendering
    if (sister_share > 0) {
        sis_share_out.style.color = "red";
        individual_share = sister_share / num_of_sis;
    }
    else { sis_share_out.style.color = "black"; }

    if (sister_share > 0) {
        sis_share_out.innerHTML = Math.round(individual_share * 100) / 100 + 
        (num_of_sis > 1 ? " x " + num_of_sis + "<br> (" + Math.round(sister_share * 100) / 100 + ")" : ""); 
    }
    else {
        sis_share_out.innerHTML = 0;
    }

    // Wives Share Rendering
    if (num_of_wives > 0 && wives_share > 0) {
        wif_share_out.style.color = "red";
    }
    else { wif_share_out.style.color = "black"; }
    individual_share = wives_share / num_of_wives;
    wif_share_out.innerHTML = Math.round(individual_share * 100) / 100 + 
    (num_of_wives > 1 ? " x " + num_of_wives + "<br> (" + Math.round(wives_share * 100) / 100 + ")" : "");

    // Remaining Share Rendering
    if (rem_share > 2) {
        rem_share_out.style.color = "red";
    } else {
        rem_share_out.style.color = "black";
    }
    rem_share_out.innerHTML = Math.round(rem_share * 100) / 100;
}

// Event handler
document.getElementById("submitButton").addEventListener("click", () => {
    handleComputation();
});