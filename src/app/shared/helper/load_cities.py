# new_cities = []
with open('../../../assets/data/cities.txt', encoding="utf8") as f:
  new_cities = f.readlines()

clean_list = []
for city in new_cities:
  clean_list.append(city.strip())

with open('../../../assets/data/cities_clean.txt', 'w', encoding='utf-8') as output:
    output.write(str(clean_list))
