// resource: siehe => http://heimtiergarten.de/tierjahre-in-menschenjahre-umrechnen-von-katze-bis-hamster/

/*
    Hund (bis 15kg) => max. Alter 20, passt 4 mal in menschl.durchschnitts. Jahren
    Hund (bis 45kg) => max. Alter 17, in menschl. durchschn. Jahren 5
    Hund (über 45kg) => max. Ater 12, in menschl. durchschn. Jahren 8
    bsp rechnung 12 * 8 = 96 Jahre alt in meschlichen Jahren

    Meerschwein => max. Alter 8, in meschl. durchschn. Jahren 13
    bsp rechnung 2,5 * 13 = 32,5 Jahre alt in menschlichen Jahren

    Katze => max. Alter 15, in menschl. durchschn. Jahren 7

    Nymphensittich => max. Alter 20, in menschl. durschn. Jahren 5
*/ 

// Formel für Hund bis 15kg
const convertDogAge = (req, res, next) =>
{
    try 
    {
        const { animalAge } = req.body.value;

        if(animalAge <= 20)
        {
            const animalAgeInHumanYears = animalAge * 4;
            return animalAgeInHumanYears;
        }
        console.error('The age of your pet is not correct!');

        next();
        
    } 
    catch(err) 
    {
        throw(err)
    }
};

// Formel für Meerschwein
const convertSeaPigAge = (req, res, next) =>
{
    try 
    {
        const { animalAge } = req.body.value;

        if(animalAge <= 8)
        {
            const animalAgeInHumanYears = animalAge * 13;
            return animalAgeInHumanYears;
        }
        console.error('The age of your pet is not correct!');

        next();

    } 
    catch(err) 
    {
        throw(err)
    }
};

// Formel für Katze
const convertCatAge = async (req, res, next) =>
{
    try
    {
        const { animalAge } = req.body;

        if(animalAge <= 15)
        {
            const animalAgeInHumanYears = await animalAge * 7;
            return animalAgeInHumanYears;
        }
        console.error('The age of your pet is not correct!');

        next();
    }
    catch(err)
    {
       throw(err)
    }
};

// Formel für Nymphensittich
const convertCockatielAge = (req, res, next) =>
{
    try 
    {
        const { animalAge } = req.body.value;

        if(animalAge <= 20)
        {
            const animalAgeInHumanYears = animalAge * 5;
            return animalAgeInHumanYears;
        }
        console.error('The age of your pet is not correct!');

        next();
    } 
    catch(err) 
    {
        throw(err)
    }
};

module.exports = { 
    convertDogAge,
    convertSeaPigAge,
    convertCatAge,
    convertCockatielAge 
};