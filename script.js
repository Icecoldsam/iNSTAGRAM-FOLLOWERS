document.addEventListener('DOMContentLoaded', function() {
    const motivationButton = document.getElementById('generate-quote');
    const bibleButton = document.getElementById('generate-bible');
    const newQuoteButton = document.getElementById('new-quote');
    const newBibleButton = document.getElementById('new-bible');
    const enButton = document.getElementById('en-button');
    const snButton = document.getElementById('sn-button');
    const zuButton = document.getElementById('zu-button');
    const backButton = document.getElementById('back');
    const loadingContainer = document.getElementById('loading-container');
    const loadingBar = document.querySelector('.loading-bar .bar');
    const loadingPercentage = document.querySelector('.loading-bar .percentage');
    const introContainer = document.getElementById('intro-container');
    const resultContainer = document.getElementById('result-container');
    const aiResult = document.getElementById('ai-result');

    const quotes = {
        en: [
            "Believe you can and you're halfway there. – Theodore Roosevelt",
            "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh",
            "Do not let what you cannot do interfere with what you can do. – John Wooden",
            "You are braver than you believe, stronger than you seem, and smarter than you think. – A.A. Milne",
            "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
            "It always seems impossible until it's done. – Nelson Mandela",
            "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
            "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. – Christian D. Larson",
            "Your time is limited, don't waste it living someone else's life. – Steve Jobs",
            "The best way to predict the future is to create it. – Abraham Lincoln",
            "Do one thing every day that scares you. – Eleanor Roosevelt"
        ],
        sn: [
            "Kutenda kunoita zvirongwa zvako zvikwanisike. – Theodore Roosevelt",
            "Nzira chete yekuzadzisa zvisingabviri ndeyekutenda kuti zvinogoneka. – Charles Kingsleigh",
            "Usarega zvausingagoni kuita zvichikanganisa zvaunokwanisa kuita. – John Wooden",
            "Iwe wakasimba kupfuura zvaunotenda, wakasimba kupfuura zvaunoita, uye wakangwara kupfuura zvaunofunga. – A.A. Milne",
            "Ramangwana nderevaya vanotenda mukunaka kwezviroto zvavo. – Eleanor Roosevelt",
            "Zvinogara zvakaita sekunge hazvigoni kuitika kudzamara zvaitwa. – Nelson Mandela",
            "Hauzombokura zvekare kuti usarudze chimwe chinangwa kana kurota chiroto chitsva. – C.S. Lewis",
            "Tenda mauri uye pazvinhu zvese zvauri. Ziva kuti pane chimwe chinhu mukati mako chinopfuura chero chipingamupinyi. – Christian D. Larson",
            "Nguva yako ishoma, usaishandisa uchirarama hupenyu hweumwe munhu. – Steve Jobs",
            "Nzira yakanakisa yekufanotaura ramangwana ndeyekuigarira. – Abraham Lincoln",
            "Ita chimwe chinhu chisingakudzikisi mazuva ese. – Eleanor Roosevelt"
        ],
        zu: [
            "Kukholwa kuyasiza ukuthi izinhlelo zakho zifezeke. – Theodore Roosevelt",
            "Umthetho wokwenza into ebalulekile ukwazi ukuthi kuyazimiseleka. – Charles Kingsleigh",
            "Ungakwenza into oyenzayo uyakwenza ukuthi ungayivimbi. – John Wooden",
            "Ungumqambi kunawe ongenza into ezithandwayo, ungcwele kunawe onjengowe ngiphethwe. – A.A. Milne",
            "Indlela kuzoba nezinye ezenzeka kubantu abazizwa ngezimanga zabo. – Eleanor Roosevelt",
            "Kuyiwuphupho olufanele ukulifuna kufanele, ungenzanga. – Nelson Mandela",
            "Ungashintsha imizwa yako ukuze uye kusihlalo. – C.S. Lewis",
            "Amanda kuJehova ngezulu lakho lonke, ungagibeli ngakho konke okukuthandayo. – Izibongo 3:5",
            "Uyavuma ngathi, ngoba nginawe; ungakhulumi, ngoba ngiyiNkosi yakho; ngiyakusiza, ngiyakuncedisa, ngizokugcina ngezandla zami ezimnandi. – Isaya 41:10",
            "Igama likaJehova lizindlela ezimnandi; abalungisa bayakwazi ukufikela kulo, bayazithokozisa. – Izibongo 18:10"
        ]
    };

    let currentLanguage = 'en'; // Default language

    // Function to generate random number within a range
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Function to show loading animation
    function showLoadingAnimation() {
        loadingContainer.classList.remove('hide');
        introContainer.classList.add('hide');
        resultContainer.classList.add('hide');
        loadingBar.style.width = '0';
        loadingPercentage.textContent = '0%';
        let width = 0;

        function frame() {
            if (width >= 100) {
                setTimeout(showResults, 500); // Simulate server processing time
            } else {
                width++;
                loadingBar.style.width = width + '%';
                loadingPercentage.textContent = width + '%';
                requestAnimationFrame(frame);
            }
        }

        requestAnimationFrame(frame);
    }

    // Function to hide loading animation and show results
    function showResults() {
        loadingContainer.classList.add('hide');
        resultContainer.classList.remove('hide');
        aiResult.textContent = ''; // Clear previous content
        typeWriter(generateRandomContent());
    }

    // Function to generate random content (quote or Bible verse)
    function generateRandomContent() {
        return Math.random() < 0.5 ? generateRandomQuote() : generateRandomBibleVerse();
    }

    // Function to generate a random motivational quote
    function generateRandomQuote() {
        const quotesArray = quotes[currentLanguage];
        const index = getRandomNumber(0, quotesArray.length);
        return quotesArray[index];
    }

    // Function to generate a random Bible verse
    function generateRandomBibleVerse() {
        const bibleArray = quotes[currentLanguage]; // Assuming bibleVerses is missing; using quotes as a placeholder
        const index = getRandomNumber(0, bibleArray.length);
        return bibleArray[index];
    }

    // Function for typing animation
    function typeWriter(text) {
        let index = 0;
        const speed = 10; // Adjust typing speed here (lower value = faster typing)
        aiResult.textContent = ''; // Clear previous content

        function type() {
            if (index < text.length) {
                aiResult.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Event listeners for generating quotes and Bible verses
    motivationButton.addEventListener('click', showLoadingAnimation);
    bibleButton.addEventListener('click', showLoadingAnimation);

    // Event listener for language buttons
    enButton.addEventListener('click', function() {
        currentLanguage = 'en';
        if (!introContainer.classList.contains('hide')) {
            return; // Don't reload quotes if still on intro page
        }
        showLoadingAnimation();
    });

    snButton.addEventListener('click', function() {
        currentLanguage = 'sn';
        if (!introContainer.classList.contains('hide')) {
            return; // Don't reload quotes if still on intro page
        }
        showLoadingAnimation();
    });

    zuButton.addEventListener('click', function() {
        currentLanguage = 'zu';
        if (!introContainer.classList.contains('hide')) {
            return; // Don't reload quotes if still on intro page
        }
        showLoadingAnimation();
    });

    // Event listeners for new quote and new Bible verse buttons
    newQuoteButton.addEventListener('click', showLoadingAnimation);
    newBibleButton.addEventListener('click', showLoadingAnimation);

    // Event listener for back button
    backButton.addEventListener('click', function() {
        resultContainer.classList.add('hide');
        introContainer.classList.remove('hide');
    });
});
