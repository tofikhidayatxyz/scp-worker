// import htmlToPdf from 'html-pdf'
// // const OPEN_AI_TOKEN = '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'

// import Bull from '@ioc:Rocketseat/Bull'
// import TextSummaryzation from 'App/Jobs/TextSummaryzation'

// // // Voice comand prompt

// // const voiceText = 'Give me sugestion for book that relevant to electronic'

// // const prompts = `

// // Based on the following prompts, write a command that will be executed by the application.
// // You must be follow this rules
// // - The command must be in the following trained comand PROMPT TRAINS Otherwise it will be ignored
// // - Response must be  follow the following format ${JSON.stringify(responseFormat)}
// // - You can change  the USER COMAND prompt because it willbe have a lot of typo, for example : Facebook must be Book ETC, can be relevan to BOOK LIST
// // - If you can't the comand that relevant to USER COMAND prompt, you can skip it by type "skip"
// // - You can read our book list here  for make a sugestion or redirection step to page detail
// // - Also you willbe able to create sugestion text for user, for example : "Do you mean Git for beginer ?"
// // - If your sugestion is near to book title, you can make a redirection step to page detail
// // - You can ignore find_book comand when you found book from book list
// // - If you found book from book list you can make a redirection step to page detail
// // - If you can't find book from book list you can return as find_book comand

// // PROMPT TRAINS: ${JSON.stringify(promptsTrains)}
// // BOOK LIST: ${JSON.stringify(booksData)}
// // USER COMAND: ${voiceText}
// // `

// // const app = async () => {
// //   const openai = new OpenAI({
// //     apiKey: OPEN_AI_TOKEN,
// //   })

// //   const completion = await openai.chat.completions.create({
// //     messages: [{ role: 'user', content: prompts }],
// //     model: 'gpt-4',
// //   })

// //   console.log(completion.choices[0].message.content)
// //   //   If response is skip throw that we can process your comand and you can try again
// // }

// // app()

// const randomtext = [
//   { page: 1, text: '' },
//   {
//     page: 2,
//     text: 'publisher helped nourish the variety the Murrays list the fields history, travel, biography and art and archaeology but position was always mix editor, salesman and administra- tor. One side interests was typography and design. When was young sister and were given small Adana hand printing press. Joe Tanner, director the Frome printer Butler Tanner that printed many Murray books, was friend father and kindly supplied with fonts Bembo, Baskerville and Gill Sans. used print party invitations, Christmas cards, letter headings and suchlike for family and friends. This led fascination with printing and during later years collected wide range printers specimen type books, books design well runs Alphabet Images, Signature and the Newsletters the Curwen Press. pursued this particular interest and created number books, which edited, designed and, one occasion, typeset and bound myself.',
//   },
//   {
//     page: 3,
//     text: 'and once again had great fun illustrating with all kinds pictures Early learnt that the Murrays publishing was way life and that work and play merged into each other. While was boarding school father used write letters with the latest news what was going Albemarle Street, the home and later the publishing oYces the Murrays since father would describe how went exploring parish churches with John Piper and John Betjeman preparation for their county guides and how would visit Dame Felicitas, Abbess the enclosed order Benedictine nuns Stanbrook Abbey, discuss with her through grille her book Great Tradition. also remember his description the excitement when Paddy Leigh Fermor tracked down Byrons slippers Missolonghi and sent back tracing them father check them against Byrons boots our collection. Then there was the evening spent the drawing room Albemarle Street with Harold Nicolson and Peter Quennell reading through original Byron letters brought from the archive, trying discover what Byron was certain date May that was vital piece information required Harold Nicolson for book was writing. This gave idea what the Murray style publishing parents were close friends with their authors and there was clearly overlap with the family can seen the choice their childrens godparents. Sir Francis Younghusband, who led Lord Curzons notorious invasion Tibet was elder sisters godfather, Freya Stark, the Arabian traveller, was godmother, Osbert Lancaster, the cartoonist, writer and theatre designer, was younger sisters godfather and John Piper was found early that the Murrays were often much more than publishers their duties their authors.',
//   },
//   {
//     page: 4,
//     text: 'Freya Stark asked father send her hip bath the Hadhramaut diplomatic bag, and Noni Jabavu, the first Bantu author published English, asked send her pot Plush Prune nail varnish urgently. had idea how procure this had ask the advice young From the drawing room Albemarle Street became the great meeting place authors, politicians, explorers, scientists and archaeologists. Its historic rooms are still lined with portraits generations authors including Byron, Walter Scott, Coleridge, Darwin, David Livingstone and those who came later. when the publishing oYces took over, No. was the home the Murrays and many ways father continued treat home. After the Second World War re-established the tradition commissioning por- traits his 20th-century authors and these now adorn the beautiful 18th-century staircase the first floor. When Im the main rooms alone the evening gets dark, can imagine the authors coming out their frames like the scene the haunted gallery Gilbert Sullivans Ruddigore and picking their conversations from where theyd left oV. fathers time, Osbert Lancaster always popped for gossip after doing his pocket cartoon for the Daily Express. No, no, no. father didnt give and sold his few shares Bovril finance the publication Continual Dew was Betjemans second book poetry and included one his most famous lines, Come, friendly bombs, and fall Slough! father would often take Betjeman Murrays warehouse where',
//   },
//   {
//     page: 5,
//     text: 'enjoyed exploring the building and watching the staV work packing books. his request, the same wrapping paper was used for the dust jacket the first edition Summoned Bells. father had great charisma and taught how get with even the most diYcult authors. example this how won over Kenneth Clark. Murrays had published few Clarks books before the enormous success Civilisation While the television series and book were being discussed with the BBC, Clark came see father and said, Jock, Ive signed and sealed the contract with the father, way that only could do, persuaded him that Murrays would serve him best and amazingly agreed that should renegotiate the book rights with the BBC. This was demonstration Clarks loyalty father, and became the BBCs first book jointly published with commercial publisher. This was certainly the case with Peter Hopkirk who came with the typescript his first book Foreign Devils the Silk Road. First, immediately agreed one point: that the end one chapter should irresistibly lead the reader the next one, idea that Peter adopted his own for this and all his later books. had many tussles the future but ours was creative relationship. had learnt always see myself general reader and persuade authors that book was little use was not intelligible people was, think, always assumed that would join the family firm and hindsight suppose should have seen myself iron filing',
//   },
//   {
//     page: 6,
//     text: 'After time Eton went Magdalen College Oxford and not being academic graduated with excel- lent third-class honours degree Modern History (this only went the end the century beyond that was current aVairs!). Speaking Magdalen (and diversion), was sitting there with friend one evening reading account John Buchan walk took from London Oxford Sunday. fit undergraduate enthusiasm decided follow his example and borrowing friends car, drove London and set foot from Hanger Lane. followed the old all the way Oxford and walked exhausted twelve hours later into Hall Magdalen for dinner. Just the kind mad thing undergraduate would do. another occasion swam the Bosphorus from Europe Asia before wandering across Turkey the Syrian border. claimed have followed Byrons footsteps (breaststrokes!) until someone reminded that Byron swam the Hellespont not the Bosphorus (needing much greater stamina). the way back England climbed Mount Parnassus moonlight stream bed and was nearly eaten alive one the fierce mountain hounds trained defend sheep from the rustlers. luckily survived and managed watch from the summit the sunrise over the Peloponnese. Three months later backpacker was found dead the mountain result unfortunate meeting with one these bloodthirsty hounds. There, far from learning how cope with small family publishing firm, was trained run businesses such steel mills. was almost the only person the course coming from company under employees. There was uproar and rightly so; the firm was too small for this work and was also too steeped tradition. then spent some time Frome the printers, Butler Tanner, where decided for apprenticeship produce little book own demonstrate the skills was learning. was made',
//   },
//   {
//     page: 7,
//     text: 'Limited edition compiled and printed John Murray VII for his friends and the friends Fifty Albemarle Street. was illustrated line drawings Osbert Lancaster, which made steel repro plates, and personally de- signed the cover showing the front door No. Reg had incredible eye from years ex- perience and complete contempt for new-fangled designers who had just come out from art school. sensibly designed eye not measurement. those days the print unions were all-powerful: you only had touch the machinery the stone for them all out strike. concession was allowed typeset Variations Number Fifty monotype machine, but could only use Centaur the letter t was missing from the font and had insert each missing t hand. Oxford University Press had represented for many years Pakistan and India where was meet the Minister Education. arrival his secretary sat down and asked wait. Murray, the secretary told that they had been expecting elderly man with long white beard. Murrays and their books had been famous for many years the subcontinent that they clearly did not expect youngster like me. had marvellous agent Karachi who arranged for visit the Karachi Girls High School, where planned talk about Murrays educational books with the head- mistress.',
//   },
//   {
//     page: 8,
//     text: 'The Standard Book Numbering system was being introduced and was made responsible for responsible for implementing the system for Murrays. Clearly Murrays was going survive, had move with the times. gradually moved the entire business onto computers. This proved excellent move Murrays were publishers not distributors and had none the essential skills needed for han- During this time our sales were increasing considerably. Civilisation was selling vast numbers both hard cover and paper- back and were also selling millions copies D.G.Mackeans Introduction Biology. the general side, saw the publication Ruth Prawer Jhabvalas novel Heat and Dust that won the Booker Prize and was later made into film Merchant Ivory Productions. Without our new distribution arrangement would have Throughout working life, and the same way pre- decessors, was totally immersed the family publishing business not simply profession but way life. working',
//   },
//   {
//     page: 9,
//     text: 'building that was world famous and attracting visitors (authors, ex-authors, friends, those who wished visit the haunts Byron, Water Scott, Darwin, Livingstone and others) added interesting perspective our normal publishing day. These dip into whenever have moments spare and they lift out the world editing and the involvement running One exciting discovery early was when tracked down copy Thomas Hornors Brief Account the Colosseum, the Regents Park, antiquarian bookshop run grumpy old book- seller called Stanley Crowe Museum Street, near the British Museum. contains wonderful panorama London, sketched Thomas Horner from cradle that built top the dome Pauls Cathedral. Paul Paget, who was then Surveyor the Fabric Pauls, kindly oVered the opportunity onto the dome with him when was being renovated. When first came into publishing, struck that the lunch break was complete waste time. decided with the journalist and writer Simon Jenkins that, during lunchtimes, should prepare book the gables, pediments, turrets and other wonders above our heads. The plan was for him produce the text and the photo- graphs. both became too busy nothing happened until then decided complete myself. would designed our son Octavius with text and photographs with the title London Above Eye Level.',
//   },
//   {
//     page: 10,
//     text: 'Now that the publishing house has been sold there danger that either our younger son, Charlie, who has gone into television, will will sucked into Murrays was. the late sixties authors began use literary agents negotiate for them. most fathers time there were few middlemen and always dealt directly with his authors and this way had built very close and loyal relationship with them. His great strength was that his authors always trusted him. would give them sound advice any problems they had and this was why they remained loyal him. Those who did leave him tempted away high advances from literary agents quite often returned when they found that their new publisher did not give them the support they had received Murrays. father was also particularly fortunate attracting authors with private means who were not dependent advances and who appreciated the Murrays special qualities that their extraordinary history and friendship could oVer. When Billy Collins, head the publishing giant William Collins, took Patrick Leigh Fermor lunch and promised double any advance that Murrays oVered him, Paddy was sharp with his answer: Mr Collins, you realise that Jock Murray publisher? and walked out. Billy Collins tried this many Murray authors and received the same brush-oV.',
//   },
//   {
//     page: 11,
//     text: 'always realised that with mortgages pay and children ed- ucate, was understandable that they should accept higher oVer. would say goodbye yet always remained friends. the millennium realised that was time for sell the firm and was determined that should this while was enjoying success. this time had seen Gollancz, Deutsch and Dent and other medium-sized publishers with whom had worked closely under absorbed the large conglomerates. Nick Perren, our brilliant managing director, shared with the view that the days the medium-sized independent publisher were clearly coming end and after over years independence (longer than any other publisher our kind the world) decided needed find good home for the imprint. Nick rightly assessed that Hodder was firm that would benefit from Murrays list and had the finances support the imprint important part their group. skilfully negotiated the take-over with Tim Hely Hutchinson, who promised keep the Murray imprint and cherish its reputation. Sixteen years after the sale, Murrays remains separate and thriving imprint and Hodder benefits from The most diYcult part selling the firm for was keeping the planned sale completely secret until had taken place and was not even able breathe word members our own family. Luckily had the full support wife Virginia and brother Hallam (the only two members the family the know). For weeks before the sale, spent time writing over letters, signed personally me, authors, agents, booksellers, friends and colleagues and also the Press explaining why had decided sell.',
//   },
//   {
//     page: 12,
//     text: 'There are common rare books, scarce rare books, and rare rare books. How this apparent conundrum came become accepted the years from the mid-seventeenth the mid-nineteenth centuries was the subject David McKittericks Panizzi Lectures the British Library has now greatly expanded these The Invention Rare Books: Private Interest and Public Memory, McKitterick asks how, the age before the near-omnivorous collecting modern national libraries, and faced with ever- increasing avalanche old printed books circulation (due not just the massive expansion production during the sixteenth and seventeenth centuries but also the natural dispersal older collec- tions culminating the continent-wide upheavals stemming from the French Revolution), consensus was reached among scholars, librarians, collectors, and booksellers defining corpus older books that should considered suitable for both the private and institutional library? This gradual process resulted the first steps towards modern bibliographical standards and the orderly setting out editions comprehensive way that has survived still this wide-ranging investigation McKitterick also aims make second and larger enquiry: how are canons knowledge, reading, taste values constructed? While the answers have changed over time these are, notes, questions faced todays librarians the face overload born-digital, printed, and manuscript materials, all demanding preservation. Rarity was not, then, statistical actuality (that has only come, Private Interest and Public Memory, David McKitterick.',
//   },
//   {
//     page: 13,
//     text: 'McKitterick interested establishing what criteria made particular book worthy distinction from the common mass and therefore made worthy preservation, competition for possession, and bibliographical record. What was, indeed, that made valuable, not only financially but also historically. was, notes, no sudden discovery. was prolonged aVair, proceeding diVerent speeds diVerent subjects and diVerent lit- eratures, and was expressed several diVerent ways. order achieve this manageable corpus, entire categories books, mostly but not exclusively more popular genres such lighter literature, personal piety, domestic economy and technical manuals that were genuinely rare were excluded from the corpus acceptable books. Exclusion could ruthless; McKitterick notes, Serna Santander suggested that the editions calculated had been printed Europe the fifteenth century, it would diY- cult find worth the attention the curious, and justifying what sometimes seems like litany bibliographical saints McKitterick clearly has number special heroes. One the first was Lamoignons librarian Adrien Baillet whose encyclopedic com- Jugemens des savans sur les principaux ouvrages des auteurs volumes, of especial interest understanding the emerging priorities that were aVect taste for future generations. particular, and besides the considerable range his reading diVerent subjects, gathered conspectus printers who could regarded exemplifying the best the past, sometimes thanks the accuracy their editions, sometimes because the appearance their books, sometimes (ideally) thanks both. Thus attention was drawn the work the better early printers such Aldus, the Estiennes, and the Elzeviers who have retained their high position among collectors (except and only recently for the last) today.',
//   },
//   {
//     page: 14,
//     text: 'McKitterick suggests, the production type-specimens book- form that could bound and shelved with other books, inspired fashions for purchasing and lavishly binding (though apparently seldom reading) handsome books from the contemporary presses of, for example, Tonson, Baskerville, Bodoni and Didot. Once concern for the appearance books had developed taste naturally turned matters such paper quality (and size, with increasing attention paid Large Paper copies) and external appearances, which mean fine bindings. Its important recall though, McKitterick warns, that such tastes were always for the minority with economy usually overcoming extravagance for most book collectors these were irrelevancies. Most copies most books were plainly bound for The fine balance between economy and extravagance can par- ticularly seen work auction and trade catalogues where the costs printing dictated that descriptions should short possible, indeed they were until such copy-specific information large paper, morocco bindings gilt spines began detailed, albeit often contracted into system initials, after While noting that tastes developed among sections the bibliophile community the second half the seventeenth century for books with deco- rated spines, part the furnishing room, McKitterick does not equate this surge interest with the great turn-round that took place books that had been stored ever since they were removed from chests desks and placed shelves with their spines inwards were turned-round and replaced with their spines outwards. This created sudden demand for gilt-tooled spines with title-labels both new bindings and added old ones, taste most obvious vis- itors Samuel Pepyss library Magdalene College, Cambridge.',
//   },
//   {
//     page: 15,
//     text: 'its later revisions remained standard work into the nineteenth century) was his use asterisk mark those books which are rarest among the rare and grade the relative rarity others. Hayms view the use booksellers catalogues for reference also worth quoting although twenty years later some had improved enough for McKitterick devote chapter another his heroes, Thomas Osborne and his retail catalogues the great Harleian Library volumes, which had descriptions ranging from single line hundreds words though their use for reference was hampered the absence printed prices which were then have abstained from using the almost infinite number booksellers catalogues books for sale their shops they are generally compiled people little intelligence, even booksellers themselves, and are not precise and therefore not trusted ... McKitterick notes Hayms book, there had been nothing scale even larger than the Harleian dispersal was the sale Paris the library the duc Vallire (the greatest library assembled late eighteenth-century France). The library was consigned for auction the erudite bookseller Guillaume Bure, author the influential Bibliographie instructive volumes, who employed the young Joseph van Prat (future librarian the Bibliothque Royale) catalogue the manuscripts. The nine volumes catalogues for the two series sales (17834) were pio- neering including illustrations, expensive investment justified the high prices achieved. Thomas Frognall Dibdin, McKittericks last great hero Jacques-Charles Brunet, who was have easily the widest influence, far beyond his own country, far beyond England, and far beyond his own times.',
//   },
//   { page: 16, text: '' },
//   {
//     page: 17,
//     text: 'understand why the first decades the seventeenth are dealt with relatively cursorily. Despite the title the intention was cover the period from the mid-seventeenth the mid-nineteenth centu- ries, beginning when printed auction and retail catalogues start asking what was that made old book rare David McKitterick has raised questions that are still valid today. concludes: The challenge, what keep and how keep it, fact simply old question posed twenty-first century context. With its chronological well thematic approach McKitterick has produced historiography pre-analytical printed bibliog- raphy the period that should read everyone interested the field. The book let down only its illustrations, mostly title-pages, which are printed the grey sludge that only Cambridge University Press seems use. Buy whatever has received the imprimatur critical authority.',
//   },
//   {
//     page: 18,
//     text: 'Lawrence essay entitled Propos Lady Chatterleys Lover. was the year his death, the age only forty-four. But what made Lawrence think funereal thoughts was not much his impending demise but the fact that his hand was pirated edition his most famous (or infamous) novel. Whatever else one may think about Lawrences novels and short stories, for bibliophiles least one them absolute treasure trove. speak course Lady Britain theres tendency think that the Lady Chatterley trial raised the curtain for the very first time novel that Lawrence himself described very improper. fact that time there were already numerous pirated editions circulation, both expurgated and unexpurgated. What distin- guished the trial (apart from the hilarity occasioned) was the fact that Penguin had gambled favourable verdict and printed from the collectors bedside table worldwide distribution. Most Lawrences essay Propos Lady Chatterleys Lover amounts defence his use obscene language describe what Constance Chatterley and Oliver Mellors get novel',
//   },
//   { page: 19, text: '' },
//   {
//     page: 20,
//     text: 'Thus was that the first edition any form Lady Chatterleys Lover came printed Florence edition one thousand copies, mulberry-coloured paper boards, printed black upper cover, with the top edges rough-trimmed and the fore and bottom edges untrimmed. and the US. Orders (and cash) went Lawrence: the books were despatched from the printers. The edition sold well and Lawrence quickly followed with cheap paper issue copies the same year that was priced top-shelf novel, sensational novel, novel famous author unprotected the laws copyright was novel ripe for piracy. The very funereal volume Lawrence held his hand was the third pirated American edition hed come across: the first stolen edition, discovered, had appeared New York almost within month the first genuine copies being issued Italy, and was sold for fifteen dollars opposed the ten dollar price the Florence edition. order combat the pirates, Lawrence wrote introduction popular edition copies, published Paris francs. Koteliansky, Russian who was the business manager The Adelphi. and Aldington apparently held stock the book that the police never got wind of.',
//   },
// ]

// Bull.add(new TextSummaryzation().key, {
//   content: randomtext,
//   title: 'Just example title',
//   uuid: '9961ff51-3430-4ab5-9f66-90767c0f6e01',
// })

let htmlData = ``

let tmpl = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

for(let i =0; i < 100; i++) {
    htmlData = htmlData+tmpl
}

// console.log(htmlData.length)

// conversion({ html: htmlData }, async (_err, pdf) => {
//    console.log(_err, pdf)
// });

// console.log('done')

// const  callback = function (pdf) {
//     console.log(pdf)
// }


// pdfPupeter(htmlData, callback, {}, {
//     ignoreDefaultArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
//     waitForInitialPage: true
// });

// const options = { format: 'Letter' }


// htmlToPdf.create(htmlData, options).toFile(`./tmp/sample.pdf`, async (err) => {
//     if (err) return console.log(err)
//     console.log('done')
// })