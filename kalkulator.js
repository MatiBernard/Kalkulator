var kalk = function () {
    this.id = "kalkulator" + wylosujLiczbe(0, 10000000000);
    this.widoczny = true;
    this.operacja = "";
    this.wynik = "";
    this.pierwszaLiczba = false;
    this.drugaLiczba = false;
    this.operator = false;
    this.przecinek1 = false;
    this.przecinek2 = false;
    this.jakiOperator = "";

    this.wyzeruj_stan_kalkulatora = function () {
        this.operacja = "";
        this.wynik = "";
        this.pierwszaLiczba = false;
        this.drugaLiczba = false;
        this.operator = false;
        this.przecinek1 = false;
        this.przecinek2 = false;
        this.jakiOperator = "";
    };
    this.oblicz = function () {
        if (this.pierwszaLiczba && this.drugaLiczba && this.operator) {
            this.wynik = eval(this.operacja);
            if (this.wynik == "NaN") {
                this.wynik = "Błąd";
            }
            else if(this.wynik == "Infinity") 
            {
                this.wynik = "Nie dzielimy przez 0";
            }
        }
    };
    this.narysujKalkulator = function (parent) {
        if (parent === undefined) {
            parent = document.createElement('div');
            var body = document.querySelector('body');
            body.appendChild(parent);
        }
        var obj = document.createElement('div');
        obj.id = this.id;
        obj.className = "kalkulator";
        parent.appendChild(obj);
    };
    this.klawisze = function () {
        window.addEventListener('keypress', obslugaKlawiatury);
    };

    this.aktualiujLcd = function () {
        console.log("o " + this.operacja);
        console.log("w " + this.wynik);
        var obj = document.querySelector(".ekran");
        obj.innerHTML = this.operacja;
        if (this.wynik !== "")
        {
            obj.innerHTML += "<br> = " + this.wynik;
        }
    };
    //definicja LCD
    var ekran = function ()
    {
        this.id = "lcd" + wylosujLiczbe(0, 10000000000);
        this.narysujLCD = function ()
        {
            var obj = document.createElement('div');
            obj.id = this.id;
            obj.className = "ekran";
            parent.appendChild(obj);
        };
    };
    //koniec definicji LCD
    
    //definicja przyciskow
    var przycisk = function (_zawartosc, klasaPrzycisku) {
        this.id = "przycisk" + wylosujLiczbe(0, 100000000000);
        this.zawartosc = _zawartosc;

        this.rysowaniePrzycisku = function () {
            var obj = document.createElement('div');
            obj.id = this.id;
            obj.innerHTML = this.zawartosc;
            obj.className = "przycisk" + " " + klasaPrzycisku;
            obj.addEventListener("click", obslugaKlikniecia);
            parent.appendChild(obj);
        };
        this.rysowaniePrzycisku();
    };
    //koniec def przycisku 
    
    this.badajWielkoscOkna = function () { // kiedy kalkulator nie mieści się na stronie
        window.addEventListener('resize', function () {
            var style = window.getComputedStyle(parent, null);
            var wysokosc = parseInt(style.getPropertyValue('height'));
            var szerokosc = parseInt(style.getPropertyValue('width'));
            if (window.innerHeight <= wysokosc + 20 || window.innerWidth <= szerokosc + 20)
            {
                parent.style.visibility = "hidden";
            } else if (window.innerHeight >= wysokosc + 20 && window.innerWidth >= szerokosc + 20)
            {
                parent.style.visibility = "visible";
            }
        });
    };
    this.narysujKalkulator();
    var parent = document.querySelector("#" + this.id);
    this.lcd = new ekran();
    this.lcd.narysujLCD();
    this.klawisze();
    var tablica_przyciskow = ["C","przycisk_kasowanie", "7","przycisk_numer", "8","przycisk_numer", "9","przycisk_numer", "*","przycisk_operacja", "4","przycisk_numer", "5","przycisk_numer", "6","przycisk_numer", "/","przycisk_operacja", "1","przycisk_numer", "2","przycisk_numer", "3","przycisk_numer", "-","przycisk_operacja", "0","przycisk_numer", ",","przycisk_numer", "=","przycisk_rowna_sie", "+", "przycisk_operacja"];
    for (var i = 0; i < tablica_przyciskow.length; i+=2)
    {
        var guzik = new przycisk(tablica_przyciskow[i], tablica_przyciskow[i+1]);
    }
    this.badajWielkoscOkna();
};

function obslugaKlikniecia()
{
    var zawartosc = this.innerHTML;
    var kod = zawartosc.charCodeAt(0);
    obslugaKlawiatury(null, kod);
}
function obslugaKlawiatury(e, mojKod) {
    var key_Code;
    if (mojKod != undefined)
    {
        key_Code = mojKod;
    } else
    {
        if (window.event) {
            key_Code = e.keyCode;
        } else {
            key_Code = e.which;
        }
    }
    var znak = String.fromCharCode(key_Code);
    switch (znak) {
        case 'C':
            k.wyzeruj_stan_kalkulatora();
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if (k.wynik != "" || k.wynik == "0")
            {
                k.wyzeruj_stan_kalkulatora();
            }
            if (k.operator) {
                k.drugaLiczba = true;
                
            } else {
                k.pierwszaLiczba = true;
            }
            if (k.operacja[0] != "0" && k.przecinek1 == false) {
                k.operacja += znak;
            }
            if (k.operator && k.przecinek2 == false) {
                var polozenieOperatora = k.operacja.indexOf(k.jakiOperator);
                if (k.operacja[polozenieOperatora + 1] != "0") {
                    k.operacja += znak;
                }
            }
            if (k.przecinek1 && k.operator == false) {
                k.operacja += znak;
            }
            if (k.przecinek2) {
                k.operacja += znak;
            }
            break;
        case ',':
        case '.':
            if (k.operacja.length >= 1) {
                if (k.przecinek1 == false || (k.przecinek2 == false && k.operator == true)) {
                    var ostatniIndex = k.operacja.length - 1;
                    if (isNaN(k.operacja[ostatniIndex]) == false) {
                        k.operacja += ".";
                        if (k.operator == false) {
                            k.przecinek1 = true;
                        } else {
                            k.przecinek2 = true;
                        }
                    }
                }
            }
            break;
        case '+':
        case '-':
        case '/':
        case '*':
            if(k.operator != true)
            if (k.operacja.length >= 1 && k.operacja.indexOf(znak) == -1) {
                var ostatniIndex = k.operacja.length - 1;
                if (k.operacja[ostatniIndex] != ".") {
                    k.operacja += znak;
                    k.jakiOperator = znak;
                    k.operator = true;
                    k.przecinek1 = true;
                }
            }
            break;
        case '=':
            k.oblicz();
            break;
    }// koniec switcha
    
    if (key_Code == 13) {
        k.oblicz();
    }
    k.aktualiujLcd();
}

var k = new kalk();

