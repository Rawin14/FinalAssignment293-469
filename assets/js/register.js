    // Define provinces by country
    const provincesByCountry = {
      thailand: [
        "Bangkok", "Chiang Mai", "Phuket", "Chonburi", "Rayong", "Nakhon Ratchasima", "Khon Kaen", "Udon Thani", "Songkhla", "Surat Thani", 
        "Chiang Rai", "Nakhon Si Thammarat", "Pattani", "Phang Nga", "Trat", "Ayutthaya", "Lopburi", "Phetchaburi", "Ratchaburi", "Nakhon Nayok",
        "Pathum Thani", "Nonthaburi", "Samut Prakan", "Samut Sakhon", "Samut Songkhram", "Prachuap Khiri Khan", "Phetchabun", "Sukhothai", 
        "Phitsanulok", "Uttaradit", "Tak", "Kamphaeng Phet", "Lampang", "Lamphun", "Phayao", "Nan", "Mae Hong Son", "Nakhon Phanom", 
        "Mukdahan", "Sakon Nakhon", "Kalasin", "Roi Et", "Maha Sarakham", "Chaiyaphum", "Buriram", "Surin", "Si Sa Ket", "Amnat Charoen", 
        "Ubon Ratchathani", "Yasothon", "Loei", "Nong Khai", "Nong Bua Lamphu", "Chai Nat", "Sing Buri", "Ang Thong", "Nakhon Pathom", 
        "Suphan Buri", "Kanchanaburi", "Sa Kaeo", "Prachin Buri", "Nakhon Sawan", "Uthai Thani", "Phichit", "Phrae", "Saraburi", "Chanthaburi", 
        "Yala", "Narathiwat"
      ],
    
      usa: [
        "California", "Texas", "New York", "Florida", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan", 
        "Virginia", "Washington", "Arizona", "Massachusetts", "Indiana", "Missouri", "Tennessee", "Colorado", "Maryland", "Wisconsin",
        "Minnesota", "South Carolina", "Alabama", "Louisiana", "Kentucky", "Oregon", "Oklahoma", "Connecticut", "Iowa", "Mississippi", 
        "Arkansas", "Nevada", "Kansas", "New Mexico", "Nebraska", "West Virginia", "Idaho", "Hawaii", "Maine", "New Hampshire", 
        "Montana", "Rhode Island", "Delaware", "South Dakota", "North Dakota", "Alaska", "Vermont", "Wyoming"
      ],
    
      uk: [
        "London", "Manchester", "Liverpool", "Birmingham", "Leeds", "Sheffield", "Bristol", "Newcastle", "Nottingham", "Glasgow", 
        "Edinburgh", "Cardiff", "Belfast", "Coventry", "Leicester", "Sunderland", "Bradford", "Brighton", "Hull", "Derby", 
        "Stoke-on-Trent", "Southampton", "Wolverhampton", "Portsmouth"
      ],
    
      japan: [
        "Tokyo", "Osaka", "Kyoto", "Hokkaido", "Fukuoka", "Nagoya", "Yokohama", "Kobe", "Sapporo", "Hiroshima", 
        "Okinawa", "Nara", "Shizuoka", "Sendai", "Kagoshima", "Miyazaki", "Kumamoto", "Okayama", "Niigata", "Fukushima",
        "Matsuyama", "Takamatsu", "Kanazawa", "Nagano"
      ],
    
      china: [
        "Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Xi'an", "Wuhan", "Chongqing", "Tianjin", "Hangzhou", 
        "Nanjing", "Harbin", "Suzhou", "Changsha", "Qingdao", "Shenyang", "Zhengzhou", "Jinan", "Fuzhou", "Kunming"
      ],
    
      india: [
        "Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "Gujarat", "West Bengal", "Rajasthan", "Kerala", "Punjab", "Bihar", 
        "Madhya Pradesh", "Andhra Pradesh", "Telangana", "Haryana", "Assam", "Odisha", "Chhattisgarh", "Jharkhand", "Uttarakhand", "Goa"
      ],
    
      germany: [
        "Bavaria", "Baden-Württemberg", "North Rhine-Westphalia", "Hesse", "Saxony", "Lower Saxony", "Berlin", "Hamburg", "Thuringia", "Brandenburg", 
        "Saarland", "Saxony-Anhalt", "Schleswig-Holstein", "Rhineland-Palatinate", "Bremen", "Mecklenburg-Vorpommern"
      ],
    
      france: [
        "Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Nouvelle-Aquitaine", "Occitanie", "Brittany", "Grand Est", "Normandy", "Hauts-de-France", "Pays de la Loire", 
        "Corsica", "Centre-Val de Loire", "Bourgogne-Franche-Comté", "Loire Valley", "Alsace"
      ],
    
      australia: [
        "New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania", "Northern Territory", "Australian Capital Territory", 
        "Sunshine Coast", "Central Coast", "Gold Coast", "Canberra", "Wollongong", "Hobart", "Geelong"
      ],
    
      canada: [
        "Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick", "Prince Edward Island", "Newfoundland and Labrador", 
        "Nunavut", "Yukon", "Northwest Territories", "Vancouver Island", "Ottawa"
      ],
    
      spain: [
        "Madrid", "Barcelona", "Valencia", "Seville", "Malaga", "Bilbao", "Zaragoza", "Mallorca", "Cuenca", "Granada",  
        "Alicante", "Murcia", "Las Palmas de Gran Canaria", "A Coru?a", "Pamplona", "Valladolid", "Salamanca", "Valladolid", "Segovia"
      ],
    
      italy: [
        "Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Firenze", "Catania", "Venezia", 
        "Siena", "Ravenna", "Bari", "Pisa", "Perugia", "Messina", "Cagliari", "Trieste", "Trapani", "Ferrara"
      ],
    
      mexico: [
        "Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "Chihuahua", "Quer?taro", "Canc?n", "Ciudad Ju?rez", "Oaxaca", 
        "Tampico", "Veracruz", "Matamoros", "Hermosillo", "Villahermosa", "Tuxtla Guti?rrez", "Chilpancingo", "Cuernavaca", "Morelia", "Zacatecas"    
      ],
      switzerland: [
        "Zurich", "Geneva", "Basel", "Luzern", "Bern", "Lausanne", "St. Gallen", "Schaffhausen", "Schwyz", "Biel/Bienne", 
        "Lugano", "Luzern", "St. Gallen", "Schaffhausen", "Schwyz", "Biel/Bienne", "Lugano", "Luzern", "St. Gallen", "Schaffhausen", "Schwyz"
      ],
    
      netherlands: [
        "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Groningen", "Tilburg", "Breda", "Almere", "Arnhem", 
        "Heerlen", "Zwolle", "Zaanstreek", "Delft", "Maastricht", "Leiden", "Middelburg", "Roosendaal", "Den Haag", "Amsterdam"
      ],
    
      belgium: [
        "Brussels", "Antwerp", "Gent", "Charleroi", "Liege", "Namur", "Leuven", "Schaerbeek", "Hasselt", "Sint-Niklaas", 
        "Ghent", "Brussels", "Antwerp", "Gent", "Charleroi", "Liege", "Namur", "Leuven", "Schaerbeek", "Hasselt", "Sint-Niklaas"
      ],
    
      portugal: [
        "Lisbon", "Porto", "Faro", "Braga", "Bragan?a", "Coimbra", "Viseu", "Vila Real", "Viana do Castelo", "Aveiro", 
        "Guarda", "Viseu", "Vila Real", "Viana do Castelo", "Aveiro", "Guarda", "Viseu", "Vila Real", "Viana do Castelo", "Aveiro"
      ],
    
      norway: [
        "Oslo", "Trondheim", "Stavanger", "Bergen", "Molde", "Stavanger", "Bergen", "Molde", "Trondheim", "Stavanger", 
        "Bergen", "Molde", "Stavanger", "Bergen", "Molde", "Trondheim", "Stavanger", "Bergen", "Molde", "Stavanger"
      ],
    
      sweden: [
        "Stockholm", "Gothenburg", "Malmo", "Uppsala", "Link?ping", "G?teborg", "Kristianstad", "Helsingborg", "Lund", "Orebro", 
        "V?rnamo", "M?l?ndal", "Lund", "Orebro", "V?rnamo", "M?l?ndal", "Lund", "Orebro", "V?rnamo", "M?l?ndal"
      ],
    
      denmark: [
        "Copenhagen", "Aarhus", "Odense", "Aalborg", "Helsingor", "K?benhavn", "Aalborg", "Helsingor", "K?benhavn", "Aalborg", 
        "Helsingor", "K?benhavn", "Aalborg", "Helsingor", "K?benhavn", "Aalborg", "Helsingor", "K?benhavn", "Aalborg", "Helsingor"
      ],
    
      ireland: [
        "Dublin", "Cork", "Galway", "Limerick", "Waterford", "Kerry", "Limerick", "Waterford", "Kerry", "Limerick", 
        "Waterford", "Kerry", "Limerick", "Waterford", "Kerry", "Limerick", "Waterford", "Kerry", "Limerick", "Waterford"
      ],
    
      poland: [
        "Warsaw", "Krakow", "Wroclaw", "Gdansk", "Szczecin", "Katowice", "Gdansk", "Szczecin", "Katowice", "Gdansk", 
        "Szczecin", "Katowice", "Gdansk", "Szczecin", "Katowice", "Gdansk", "Szczecin", "Katowice", "Gdansk", "Szczecin"
      ],
     finland: [
        "Helsinki", "Espoo", "Tampere", "Turku", "Oulu", "Kuopio", "Helsinki", "Espoo", "Tampere", "Turku", 
        "Oulu", "Kuopio", "Helsinki", "Espoo", "Tampere", "Turku", "Oulu", "Kuopio", "Helsinki", "Espoo"
      ],
      hungary: [
        "Budapest", "Szeged", "Miskolc", "Szombathely", "Szeged", "Miskolc", "Szombathely", "Szeged", "Miskolc", "Szombathely", 
        "Szeged", "Miskolc", "Szombathely", "Szeged", "Miskolc", "Szombathely", "Szeged", "Miskolc", "Szombathely", "Szeged"
      ],
      czech: [
        "Prague", "Brno", "Ostrava", "Pardubice", "Liberec", "Usti nad Labem", "Pardubice", "Liberec", "Usti nad Labem", "Pardubice",
        "Liberec", "Usti nad Labem", "Pardubice", "Liberec", "Usti nad Labem", "Pardubice", "Liberec", "Usti nad Labem", "Pardubice", "Liberec"
      ],
      slovakia: [
        "Bratislava", "Kosice", "Zilina", "Trnava", "Nitra", "Zilina", "Trnava", "Nitra", "Zilina", "Trnava",
        "Nitra", "Zilina", "Trnava", "Nitra", "Zilina", "Trnava", "Nitra", "Zilina", "Trnava", "Nitra"
      ],
      romania: [
        "Bucharest", "Cluj-Napoca", "Timisoara", "Sibiu", "Constanta", "Bucharest", "Cluj-Napoca", "Timisoara", "Sibiu", "Constanta",
      ],
      bulgaria: [
        "Sofia", "Plovdiv", "Varna", "Burgas", "Ruse", "Plovdiv", "Varna", "Burgas", "Ruse", "Plovdiv",
        "Varna", "Burgas", "Ruse", "Plovdiv", "Varna", "Burgas", "Ruse", "Plovdiv", "Varna", "Burgas"
      ],
      greece: [
        "Athens", "Thessaloniki", "Patras", "Larisa", "Heraklion", "Thessaloniki", "Patras", "Larisa", "Heraklion", "Thessaloniki",
        "Patras", "Larisa", "Heraklion", "Thessaloniki", "Patras", "Larisa", "Heraklion", "Thessaloniki", "Patras", "Larisa"
      ],
    };
    
    
      // Function to update provinces based on selected country
      function updateProvinces() {
        const countrySelect = document.getElementById("country");
        const provinceSelect = document.getElementById("province");
        const selectedCountry = countrySelect.value;
    
        // Clear existing options
        provinceSelect.innerHTML = '<option value="" disabled selected>Select Province</option>';
    
        // Populate province options
        if (provincesByCountry[selectedCountry]) {
          provincesByCountry[selectedCountry].forEach(province => {
            const option = document.createElement("option");
            option.value = province.toLowerCase();
            option.textContent = province;
            provinceSelect.appendChild(option);
          });
        }
      }
    
      // Form validation function
      document.getElementById("contact").addEventListener("submit", function (e) {
        const telNum = document.getElementById("TelNum").value;
        const email = document.getElementById("mail").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;
    
        // Validate phone number
        if (!/^\d{10}$/.test(telNum)) {
          alert("Telephone number must be exactly 10 digits.");
          e.preventDefault();
          return;
        }
    
        // Validate email
        if (!/\S+@\S+\.\S+/.test(email)) {
          alert("Please enter a valid email address with '@'.");
          e.preventDefault();
          return;
        }
    
        // Validate password match
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          e.preventDefault();
          return;
        }
      });
    
      // Call updateProvinces when country is changed
      document.getElementById("country").addEventListener("change", updateProvinces);