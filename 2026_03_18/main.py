with open("sygnaly.txt") as f:
    slowa = [line.strip() for line in f if line.strip()]

wyniki = []

wyniki.append("4.1")
przeslanie = ""
for i in range(39, len(slowa), 40):
    przeslanie += slowa[i][9]
wyniki.append(przeslanie)
wyniki.append("")

wyniki.append("4.2")
best_word = ""
best_count = 0
for slowo in slowa:
    rozne = len(set(slowo))
    if rozne > best_count:
        best_count = rozne
        best_word = slowo
wyniki.append(f"{best_word} {best_count}")
wyniki.append("")

def max_odleglosc(slowo):
    litery = [ord(c) - ord('A') for c in slowo]
    for i in range(len(litery)):
        for j in range(i + 1, len(litery)):
            if abs(litery[i] - litery[j]) > 10:
                return False
    return True

wyniki.append("4.3")
for slowo in slowa:
    if max_odleglosc(slowo):
        wyniki.append(slowo)

with open("wyniki4.txt", "w") as f:
    f.write("\n".join(wyniki) + "\n")
