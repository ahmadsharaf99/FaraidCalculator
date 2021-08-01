// Initialize the shares
var sons_shares = 0;
var daughters_shares = 0;
var mother_share = 0;
var father_share = 0;
var brother_share = 0;
var sister_share = 0;
var husband_share = 0;
var individual_share = 0;
var one_third_PRS = 0; 
var half_PRS = 0;
var rem_aft_dau_share = 0;
var x_share = 0;
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
    let husband = parseInt(document.getElementById("husband").value) || 0;   

    // Output doc selector vars
    let son_share_out = document.getElementById("son_share");
    let dau_share_out = document.getElementById("dau_share");
    let mother_share_out = document.getElementById("mother_share");
    let father_share_out = document.getElementById("father_share");
    let bro_share_out = document.getElementById("bro_share");
    let sis_share_out = document.getElementById("sis_share");
    let hus_share_out = document.getElementById("husband_share");
    let rem_share_out = document.getElementById("rem_share");

    let total_PRS = total_share - bequest_share;


    /* PRESCRIBED SHARES COMPUTATION */
    // Determine if there are children's shares
    if (num_of_sons > 0) {
        husband_share = (husband == 1 ? (1 / 4) * total_PRS : 0);
        mother_share = (mother == 1 ? (1 / 6) * total_PRS : 0);
        father_share = (father == 1 ? (1 / 6) * total_PRS : 0);
        x_share = total_PRS - husband_share - mother_share - father_share;
        // sons shares
        sons_shares = num_of_sons * (2 * (x_share / (2 * num_of_sons + num_of_daugthers)));
        // daughters shares
        daughters_shares = (num_of_daugthers > 0 ? num_of_daugthers * (x_share / (2 * num_of_sons + num_of_daugthers)) : 0);
    } 
    else if (num_of_sons == 0 && num_of_daugthers >= 2) {
        daughters_shares = 2 * (total_PRS / 3);
        rem_aft_dau_share = total_PRS - daughters_shares;
        husband_share = (husband == 1 ? (1 / 4) * rem_aft_dau_share : 0);
        mother_share = (mother == 1 ? (1 / 6) * rem_aft_dau_share : 0);
        father_share = (father == 1 ? (1 / 6) * rem_aft_dau_share : 0);
        brother_share = (num_of_bro ? (1/ 4) * rem_aft_dau_share : 0);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 1) {
        daughters_shares = total_PRS / 2;
        husband_share = (husband == 1 ? (1 / 4) * total_PRS : 0);
        rem_aft_dau_share = total_PRS - daughters_shares;
        mother_share = (mother == 1 ? (1 / 6) * rem_aft_dau_share : 0);
        father_share = (father == 1 ? (1 / 6) * rem_aft_dau_share : 0);
        brother_share = (num_of_bro ? (1 / 4) * rem_aft_dau_share : 0);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && num_of_bro == 0 && num_of_sis == 0) {
        mother_share = (mother == 1 ? (1 / 3) * total_PRS : 0);
        husband_share = (husband == 1 ? (1 /2) * total_PRS : 0);
        father_share = total_PRS - (mother_share + husband_share);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 1 && (num_of_bro + num_of_sis) >= 2) {
        mother_share = (1 / 6) * total_PRS;
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);

        one_third_PRS = (1 / 3) * total_PRS;
        brother_share = num_of_bro * (2 * (one_third_PRS / (2 * num_of_bro + num_of_sis)));
        sister_share = num_of_sis * (one_third_PRS / (2 * num_of_bro + num_of_sis));
        mother_share += total_PRS - (mother_share + husband_share + brother_share + sister_share);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 1 && num_of_bro == 1 && num_of_sis == 0) {
        mother_share = (1 / 3) * total_PRS;
        husband_share = (husband == 1 ? (1 / 2) * total_PRS: 0);
        brother_share = (1 / 6) * total_PRS;
        mother_share += total_PRS - (mother_share + husband_share + brother_share); 
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 1 && num_of_bro == 0 && num_of_sis == 1) {
        mother_share = (1 / 3) * total_PRS;
        husband_share = (husband == 1 ? (1 / 2) * total_PRS: 0);
        sister_share = (1 / 6) * total_PRS;
        mother_share += total_PRS - (mother_share + husband_share + sister_share);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro == 0 && num_of_sis == 1) {
        husband_share = (husband_share == 1 ? (1 / 2) * total_PRS : 0);
        sister_share = (1 / 2) * total_PRS;
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro >= 1 && num_of_sis == 0) {
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        brother_share = total_PRS - husband_share; 
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro == 0 && num_of_sis >= 2) {
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        rem_aft_hus = total_PRS - husband_share;
        
        sister_share = (2 / 3) * rem_aft_hus;
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro > 0 && num_of_sis > 0) {
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        rem_aft_hus = total_PRS - husband_share;

        brother_share = num_of_bro * (2 * (rem_aft_hus / (2 * num_of_bro + num_of_sis)));
        sister_share = num_of_sis * (rem_aft_hus / (2 * num_of_bro + num_of_sis));
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 1 && num_of_bro == 0 && num_of_sis == 0) {
        mother_share = (1 / 3) * total_PRS;
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        mother_share += total_PRS - (mother_share + husband_share);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro == 0 && num_of_sis == 0) {
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 1 && (num_of_bro + num_of_sis) >= 2) {
        mother_share = (1 / 6) * total_PRS;
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        one_third_PRS = (1 / 3) * total_PRS;
        brother_share = num_of_bro * (2 * (one_third_PRS / (2 * num_of_bro  + num_of_sis)));
        sister_share = num_of_sis* (one_third_PRS / (2 * num_of_bro  + num_of_sis));
        father_share = total_PRS - (mother_share + husband_share + brother_share + sister_share);
    } 
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 1 && num_of_bro == 1 && num_of_sis == 0) {
        mother_share = (1 / 3) * total_PRS;
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        brother_share = (1 / 6) * total_PRS;
        father_share = total_PRS - (mother_share + husband_share + brother_share);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 0 && (num_of_bro + num_of_sis) >= 2) {
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        one_third_PRS = (1 / 3) * total_PRS;
        brother_share = num_of_bro * (2 * (one_third_PRS / (2 * num_of_bro + num_of_sis)));
        sister_share = num_of_sis * (one_third_PRS / (2 * num_of_bro + num_of_sis));
        father_share = total_PRS - (mother_share + husband_share + brother_share + sister_share);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 1 && num_of_bro == 0 && num_of_sis == 1) {
        mother_share = (1 / 3) * total_PRS;
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        sister_share = (1 / 6) * total_PRS;
        father_share = total_PRS - (mother_share + husband_share + sister_share);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro == 0 && num_of_sis == 1) {
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        sister_share = (1 / 2) * total_PRS;
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 0 && mother == 0 && num_of_bro >= 1 && num_of_sis == 0) {
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        brother_share = total_PRS - husband_share;
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 1 && num_of_bro == 1 && num_of_sis == 0) {
        mother_share = (1 / 3) * total_PRS;
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        brother_share = (1 / 6) * total_PRS;
        father_share += total_PRS - (mother_share + husband_share + brother_share);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 1 && num_of_bro == 0 && num_of_sis == 1) {
        mother_share = (1 / 3) * total_PRS;
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        sister_share = (1 / 6) * total_PRS;
        father_share += total_PRS - (mother_share + husband_share + sister_share);
    } 
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 0 && num_of_bro == 1 && num_of_sis == 0) {
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        brother_share = (1 / 6) * total_PRS;
        father_share += total_PRS - (husband_share + brother_share);
    }
    else if (num_of_sons == 0 && num_of_daugthers == 0 && father == 1 && mother == 0 && num_of_bro == 0 && num_of_sis == 1) {
        husband_share = (husband == 1 ? (1 / 2) * total_PRS : 0);
        sister_share = (1 / 6) * total_PRS;
        father_share += total_PRS - (husband_share + sister_share);
    }

    rem_share = total_PRS - (sons_shares + daughters_shares + mother_share + father_share + husband_share + brother_share + sister_share);

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

    // Husband Share Rendering
    if (husband_share > 0) {
        hus_share_out.style.color = "red";
    }
    else { hus_share_out.style.color = "black"; }
    hus_share_out.innerHTML = Math.round(husband_share * 100) / 100;

    // Remaining Share Rendering
    if (rem_share > 2) {
        rem_share_out.style.color = "red";
    } else {
        rem_share_out.style.color = "black";
    }
    rem_share_out.innerHTML = Math.round(rem_share * 100) / 100;
}


document.getElementById("submitButton").addEventListener("click", () => {
    handleComputation();
});