console.log("Welcome to notes app");
showNotes();
var oDoc, sDefTxt;

function initDoc() {
    oDoc = document.getElementById("textBox");
    sDefTxt = oDoc.innerHTML;
    if (document.compForm.switchMode.checked) { setDocMode(true); }
}

function formatDoc(sCmd, sValue) {
    if (validateMode()) {
        document.execCommand(sCmd, false, sValue);
        oDoc.focus();
    }
}

function validateMode() {
    if (!document.compForm.switchMode.checked) { return true; }
    alert("Uncheck \"Show HTML\".");
    oDoc.focus();
    return false;
}

function setDocMode(bToSource) {
    var oContent;
    if (bToSource) {
        oContent = document.createTextNode(oDoc.innerHTML);
        oDoc.innerHTML = "";
        var oPre = document.createElement("pre");
        oDoc.contentEditable = false;
        oPre.id = "sourceText";
        oPre.contentEditable = true;
        oPre.appendChild(oContent);
        oDoc.appendChild(oPre);
        document.execCommand("defaultParagraphSeparator", false, "div");
    } else {
        if (document.all) {
            oDoc.innerHTML = oDoc.innerText;
        } else {
            oContent = document.createRange();
            oContent.selectNodeContents(oDoc.firstChild);
            oDoc.innerHTML = oContent.toString();
        }
        oDoc.contentEditable = true;
    }
    oDoc.focus();
}

function printDoc() {
    if (!validateMode()) { return; }
    var oPrntWin = window.open("", "_blank", "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
    oPrntWin.document.open();
    oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + oDoc.innerHTML + "<\/body><\/html>");
    oPrntWin.document.close();
}




let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
    e.preventDefault();
    var d = Date();
    let textBox = document.getElementById("textBox");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myobj = {


        date: d
    }
    notesObj.push(myobj);

    notesObj.push(textBox.innerHTML);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    textBox.value = "";
    showNotes();
});




function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
              <div class="noteCard my-2 mx-2 card" style="width: 18rem;border-radius:10px;">
                      <div class="card-body" style="border-radius:10px;width:100%;">
                          <h5 class="card-title">Note ${index + 1}</h5>
                          <p class="card-text"> ${element}</p>
                          <button style=" background-color: #CCFF3B;color:black;"
                          padding: .25em .25em;
                          border: 0;
                          color: black;
                          font-size: 1.2em;
                          font-family: 'Montserrat';
                          margin-left:25px;
                          font-weight: 500;
                          resize: none;" id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                          <h6><i>${element.date}</i></h6>

                          <div class="btndiv none"> <span style="padding: auto;" class="btns btn btn-light btn-sm nopointer"><i class="bi bi-calendar-check" style="padding: auto;"></i></span></div>
                      </div>
                  </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<div style="color:white";>Nothing to show! Use "Add a Note" section on right to add your first note.</div>`;
    }
}






function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}