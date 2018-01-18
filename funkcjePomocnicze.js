function wylosujLiczbe(min, max)
{
    var liczba = Math.round(Math.random() * (max - min) + min);
    return liczba;
}