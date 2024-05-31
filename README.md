![Little Gems]([URL](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/769/719/datas/original.png
))

## Inspiration 🧠
Have you ever been in a new city, sifting through thousands of highly-rated restaurants?
<br>
How do you know the difference between an overhyped tourist trap over a high-quality local treasure?
<br>
<br>
**Little Gems** provides a way to find the "iykyk" spots among locals that fit your dietary needs and preferences. Culinary tourism is a fast-growing billion-dollar industry. With over 195 million solo travellers each year, tourists are constantly searching for unique dining experiences that are not only highly rated but also authentic and immersive in local communities. 
<br>
<br>
By connecting locals with tourists through a time-flexible matching/pairing system, **visitors can eat like locals, with locals**, for a flat fee of $5. Through this convenient and transparent transaction, locals can share their knowledge of their community to provide flavourful recommendations and dish out their favourite spots alongside curious tourists.
<br>
## What it does 📱
**As a tourist**, customize your profile based on dietary restrictions and other information. Then set a location where you plan to be at a certain time and find a local who knows the best eats in that area! There will be a small fee given towards the local for their service.

**As a local**, you get paid for your help in introducing your local culture to tourists. This is also a great way to meet new people and teach them about what your local area has to offer that many don't know about online.

To ensure that both parties are satisfied, we implement a photo verification of either the receipt or a selfie with the other party. We would also be acting as an "escrow" to prevent tourists from taking advantage of locals.

## How we built it ⚙️
The entire frontend uses _React Native_ and the backend is fully powered by _Convex_. The **real-time databases** and **web-socket connections** from _Convex_ allowed **real-time messaging** and **lag-free synchronization** between frontend and backend. 

## Challenges we ran into 🔧
- **Authentication**: was a big pain in the beginning. Thankfully Convex's authentication features with Clerk helped make things go much smoother. 
- **Accessibility**: Another big hurdle we had was making the app more accessible and available on both iOS and Android. This required extensive user testing and research as well as meticulous UI designs. 
- **Location**: Since our app filters by location, we needed to safely acquire the user's location (mainly for locals) as we allow them to pick a range. This was somewhat difficult to do on both Android and iOS through Expo. For tourists, they were allowed to pick a city where they would like to make their request. This was surprisingly difficult to do so we implemented a "hacky" way of searching cities through [link](https://nominatim.openstreetmap.org/ui/search.html).

## Accomplishments that we're proud of 🦾
Live chat feature, payment feature, nice UI
