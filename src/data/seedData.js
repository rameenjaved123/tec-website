// ════════════════════════════════════════════════════════════
//  TEC Historical Data — imported from WordPress Gravity Forms CSVs
//  Run importHistoricalData() once from the Admin panel to seed.
// ════════════════════════════════════════════════════════════

const STORAGE_KEY = 'tec_form_submissions_v2';

// ── Enquiry Form rows (from enquiry-form-2026-05-31.csv) ──────
const ENQUIRY_ROWS = [
  { title:'Mr.',   firstName:'Mohamed Omer',      lastName:'Yaccoub',           email:'mohammedaza169@gmail.com',            mobile:'07491917278',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-05-15T11:20:07.000Z' },
  { title:'Mr.',   firstName:'Mohammed',           lastName:'Ali',               email:'mohammedahishaq@gmail.com',           mobile:'07351591222',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-05-15T11:01:53.000Z' },
  { title:'Ms.',   firstName:'Dliet Bereket',      lastName:'Mebrahtom',         email:'dinuberket@gmail.com',                mobile:'07405256717',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-05-15T10:39:33.000Z' },
  { title:'Mr.',   firstName:'Ahmed Mohamed',      lastName:'Saleh',             email:'AHMEDA0917252146ASD@GMAIL.COM',       mobile:'07477182935',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-30T09:48:17.000Z' },
  { title:'Mr.',   firstName:'Hamza',              lastName:'Khalid',            email:'78khalidhamza@gmail.com',             mobile:'07309855174',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-28T11:29:23.000Z' },
  { title:'Mr.',   firstName:'Sherzad',            lastName:'Ahmadzai',          email:'shirzadahmadzai808@gmail.com',        mobile:'07427737200',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-28T11:20:43.000Z' },
  { title:'Mr.',   firstName:'Sisay Tesfu',        lastName:'Bahre',             email:'sisaytesfu73@gmail.com',             mobile:'+447424770211', enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-28T10:52:38.000Z' },
  { title:'Mrs.',  firstName:'Nasriy Ashour',      lastName:'Ashouy',            email:'NSRYHASHWR33@GMAIL.COM',             mobile:'07342446367',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-28T10:51:15.000Z' },
  { title:'Mrs.',  firstName:'Yuanyuan',           lastName:'Qi',                email:'QIYUANYUAN1109@GMAIL.COM',           mobile:'07344126949',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-28T10:49:32.000Z' },
  { title:'Mr.',   firstName:'Habib',              lastName:'Molaeli',           email:'REZAMOLAIE110@GMAIL.COM',            mobile:'07763805047',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-24T12:35:04.000Z' },
  { title:'Mrs.',  firstName:'Fatemeh',            lastName:'Baghery',           email:'FATEMEH65BAGHERY@GMAIL.COM',         mobile:'07763805044',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-24T12:32:58.000Z' },
  { title:'Mr.',   firstName:'Abdul Ahmad',        lastName:'Timuri',            email:'timuriabdulahmad@gmail.com',          mobile:'07405459504',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-21T11:15:52.000Z' },
  { title:'Mr.',   firstName:'Amanuel',            lastName:'Goitom',            email:'amanuelgoitom1@gmail.com',            mobile:'07707563676',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-21T11:12:08.000Z' },
  { title:'Mr.',   firstName:'Mohammad Ali',       lastName:'Ehsani',            email:'MOHAMMADALIEHSANI76@GMAIL.COM',      mobile:'07762718506',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-21T10:57:30.000Z' },
  { title:'Ms.',   firstName:'Hoyam Ahmed Osman',  lastName:'Madawi',            email:'HOYAMMADAWI70@GMAIL.COM',            mobile:'07428247865',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-15T12:16:58.000Z' },
  { title:'Mrs.',  firstName:'Madalina Ionela',    lastName:'Radu',              email:'mady.forever09@gmail.com',           mobile:'07412083888',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-15T10:39:02.000Z' },
  { title:'Mrs.',  firstName:'Sanna',              lastName:'Hussain',           email:'sannahussain280@gmail.com',          mobile:'07728350376',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-15T10:16:35.000Z' },
  { title:'Mr.',   firstName:'Abdulmohsin',        lastName:'Alokozay',          email:'ABDULMOHSINALOKOZAY417@GMAIL.COM',   mobile:'07466135450',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-15T10:09:44.000Z' },
  { title:'',      firstName:'Madalina Ionela',    lastName:'Radu',              email:'mady.forever09@gmai.com',            mobile:'07412083888',  enquiringAbout:'HNC/HND in Business:  Entrepreneurship and Small Business Management',     otherCourses:[], submittedAt:'2026-04-15T09:22:09.000Z' },
  { title:'Mr.',   firstName:'Eztullah',           lastName:'Zakhailzai',        email:'ZAKHAILZAIEZATULLAH@GMAIL.COM',      mobile:'07405933927',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-14T10:05:25.000Z' },
  { title:'Mr.',   firstName:'Eztullah',           lastName:'Zakhailzai',        email:'ZAKHAILZAIEZATULLAH@GMAIL.COM',      mobile:'07405933927',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-14T10:04:02.000Z' },
  { title:'Mr.',   firstName:'Eztullah',           lastName:'Zakhailzai',        email:'ZAKHILZAIEZATULLAH@GMAIL.COM',       mobile:'07405933927',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-04-14T09:59:59.000Z' },
  { title:'Miss',  firstName:'Selamawit',          lastName:'Woldemichael',      email:'SELAMAWITWOLDEMICHAEL3@GMAIL.COM',   mobile:'07862001960',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-26T11:45:45.000Z' },
  { title:'Mr.',   firstName:'Yeshambel',          lastName:'Yihun Admas',       email:'YESHAMBELYIHUN6@GMAIL.COM',         mobile:'07424482108',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-25T15:13:53.000Z' },
  { title:'Mr.',   firstName:'Abdi',               lastName:'Gemeda',            email:'abdiigammadaa@gmail.com',            mobile:'07597628187',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-25T14:34:26.000Z' },
  { title:'Mr.',   firstName:'Ayman Abdullah',     lastName:'Taboun',            email:'alkafetabounn@gmail.com',            mobile:'07448414635',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-25T09:56:48.000Z' },
  { title:'Mr.',   firstName:'Osama',              lastName:'Qusyu',             email:'USAMAQUSAY1997@gmail.com',           mobile:'07762745475',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-23T13:10:56.000Z' },
  { title:'Mr.',   firstName:'Abdullah',           lastName:'Mohammed',          email:'AM6987109@GMAIL.COM',                mobile:'07346433161',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-23T12:39:14.000Z' },
  { title:'Mr.',   firstName:'Osama',              lastName:'Qusyu',             email:'USAMAQUSAY1997@GMAIL.COM',           mobile:'07762745475',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-23T11:33:42.000Z' },
  { title:'Mr.',   firstName:'Jael David Jean',    lastName:'Leopold',           email:'jaelleopold96@gmail.com',            mobile:'07766839801',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-16T10:16:33.000Z' },
  { title:'Mrs.',  firstName:'Saramina',           lastName:'Daluma',            email:'saramina.imran@gmail.com',           mobile:'07304354945',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-13T16:48:18.000Z' },
  { title:'Mr.',   firstName:'Mohammad',           lastName:'Alkomi',            email:'MOHKOM334@GMAIL.COM',                mobile:'07760843068',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-13T09:59:32.000Z' },
  { title:'Miss',  firstName:'Rumaisa',            lastName:'Usman',             email:'ARUMESSA@YAHOO.COM',                 mobile:'07729217077',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T16:16:33.000Z' },
  { title:'Miss',  firstName:'Rumaisa',            lastName:'Usman',             email:'ARUMESSA@YAHOO.COM',                 mobile:'07729217077',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T16:15:48.000Z' },
  { title:'Miss',  firstName:'Asima Sameer',       lastName:'Khan',              email:'ASIMASAMIR23@GMAIL.COM',             mobile:'07562518759',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T16:15:03.000Z' },
  { title:'Miss',  firstName:'Alesha',             lastName:'Imran',             email:'aleshaimran5858@gmail.com',          mobile:'07380984828',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T15:58:44.000Z' },
  { title:'Miss',  firstName:'Aleesha',            lastName:'Imran',             email:'aleshaimran5858@gmail.com',          mobile:'07380984828',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T15:57:20.000Z' },
  { title:'Miss',  firstName:'Aleesha',            lastName:'Imran',             email:'aleshaimran5858@gmail.com',          mobile:'07380984828',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T15:55:59.000Z' },
  { title:'Mr.',   firstName:'Alex-Solomon',       lastName:'Munteanu',          email:'ASMalexxx10@gmail.com',              mobile:'07776813434',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T15:32:12.000Z' },
  { title:'Mr.',   firstName:'Jael David Jean',    lastName:'Leopold',           email:'jaelleopold96@gmail.com',            mobile:'07766839801',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T15:03:23.000Z' },
  { title:'Miss',  firstName:'Rana',               lastName:'Alappas',           email:'rana.hallo01@gmail.com',             mobile:'07349286167',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T15:02:18.000Z' },
  { title:'Mr.',   firstName:'Cedric',             lastName:'Frederic',          email:'cedricfrederic7@gmail.com',          mobile:'07961755127',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T15:01:32.000Z' },
  { title:'Mr.',   firstName:'Jean Lansley',       lastName:'Labonne',           email:'lansley2104@gmail.com',              mobile:'07440548312',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T15:00:36.000Z' },
  { title:'Mr.',   firstName:'Mohammed Tom',       lastName:'Eid',               email:'mohammedtomied@gmail.com',           mobile:'07553004363',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T14:56:49.000Z' },
  { title:'Ms.',   firstName:'Stefania',           lastName:'Preda',             email:'predastefania1976@gmail.com',        mobile:'07440519033',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T14:54:08.000Z' },
  { title:'Mr.',   firstName:'Abdirahim Mohamud',  lastName:'Salaad',            email:'abdirahimmohamud698@gmail.com',      mobile:'07405081578',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T14:52:11.000Z' },
  { title:'Miss',  firstName:'Sadia',              lastName:'Andarabi',          email:'sadiaandrabi092@gmail.com',          mobile:'07307463574',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T14:44:46.000Z' },
  { title:'Mr.',   firstName:'Mustafa',            lastName:'Ali',               email:'afaalim49@gmail.com',                mobile:'07391482490',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T14:42:54.000Z' },
  { title:'Ms.',   firstName:'Faiza',              lastName:'Sadat',             email:'sadatfaiza926@gmail.com',            mobile:'07897594903',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T14:40:45.000Z' },
  { title:'Mrs.',  firstName:'Samra',              lastName:'Waliat',            email:'samraarmaan@gmail.com',              mobile:'07389847356',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T14:38:46.000Z' },
  { title:'Mrs.',  firstName:'Maria',              lastName:'Tariq',             email:'tariqmaria329@gmail.com',            mobile:'07876611154',  enquiringAbout:'ESOL',                                                                      otherCourses:[], submittedAt:'2026-03-12T14:37:17.000Z' },
  { title:'Miss',  firstName:'Liberty',            lastName:'Simmons',           email:'LIBERTYSA05@GMAIL.COM',              mobile:'07539476078',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T14:36:49.000Z' },
  { title:'Mr.',   firstName:'Mohsin',             lastName:'Ali',               email:'MOHSAN111@OUTLOOK.COM',              mobile:'07736241677',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T14:08:01.000Z' },
  { title:'Mr.',   firstName:'Mohammad',           lastName:'Alkomi',            email:'MOHKOM334@GMAIL.COM',                mobile:'07760843068',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T14:05:56.000Z' },
  { title:'Mr.',   firstName:'Abdulaziz',          lastName:'Almasri',           email:'ABDULAZIZ528821@GMAIL.COM',          mobile:'07311314714',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T14:03:39.000Z' },
  { title:'Mr.',   firstName:'Waqar',              lastName:'Nasir',             email:'WAQARN775@GMAIL.COM',                mobile:'07389847356',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T14:01:17.000Z' },
  { title:'Mr.',   firstName:'Moussa Camara',      lastName:'Sadiakhou',         email:'BALLERMOUSSA@GMAIL.COM',             mobile:'07827886491',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T13:58:02.000Z' },
  { title:'Mr.',   firstName:'Adis Armaan',        lastName:'Nasir',             email:'NASIRADIS0@GMAIL.COM',               mobile:'07553636217',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T13:55:28.000Z' },
  { title:'Mr.',   firstName:'Adis Armaan',        lastName:'Nasir',             email:'nasiradis0@gmail.com',               mobile:'07553636217',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T13:53:59.000Z' },
  { title:'Ms.',   firstName:'Fatima',             lastName:'Gul',               email:'fatima.gul202023@gmail.com',         mobile:'07756757368',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T13:45:01.000Z' },
  { title:'Mr.',   firstName:'Nasir',              lastName:'Khan',              email:'nasirkhann2008@gmail.com',           mobile:'07555076593',  enquiringAbout:'NCFE & Open Awards Level 2 in English',                                     otherCourses:[], submittedAt:'2026-03-12T13:38:04.000Z' },
  { title:'Mr.',   firstName:'Mateusz',            lastName:'Szewczyk',          email:'bagieciarz@hotmail.com',             mobile:'07823612522',  enquiringAbout:'Other Courses', otherCourses:['Functional Skills English','Functional Skills Mathematics'], submittedAt:'2025-01-31T16:29:09.000Z' },
  { title:'Miss',  firstName:'Paulina',            lastName:'Salbut',            email:'Salbutpaulina0@gmail.com',           mobile:'+447823612522', enquiringAbout:'Other Courses', otherCourses:['Functional Skills English','Functional Skills Mathematics'], submittedAt:'2025-01-31T16:28:26.000Z' },
  { title:'Miss',  firstName:'Ana Maria',          lastName:'Closca',            email:'closcaana2005@gmail.com',            mobile:'07586038410',  enquiringAbout:'Other Courses', otherCourses:['Functional Skills English','Functional Skills Mathematics'], submittedAt:'2025-01-21T15:55:57.000Z' },
  { title:'Mr.',   firstName:'Florin Georgian',    lastName:'Bran',              email:'florinbrangeorgian47@cloud.com',     mobile:'07488540611',  enquiringAbout:'Other Courses', otherCourses:['Functional Skills English','Functional Skills Mathematics'], submittedAt:'2025-01-21T15:53:27.000Z' },
  { title:'Mr.',   firstName:'Gelu Catalin',       lastName:'Cosca',             email:'catalinclosca43@gmail.com',          mobile:'07425823855',  enquiringAbout:'Other Courses', otherCourses:['Functional Skills English','Functional Skills Mathematics'], submittedAt:'2025-01-21T15:52:30.000Z' },
  { title:'Mr.',   firstName:'Ionut',              lastName:'Napa',              email:'Ionutnapa04@gmail.com',              mobile:'07739036892',  enquiringAbout:'Other Courses', otherCourses:['Functional Skills English','Functional Skills Mathematics'], submittedAt:'2025-01-21T15:51:20.000Z' },
  { title:'Miss',  firstName:'Madalina',           lastName:'Feraru',            email:'madalinaferaru724@gmail.com',        mobile:'07741795897',  enquiringAbout:'Other Courses', otherCourses:['Functional Skills English','Functional Skills Mathematics'], submittedAt:'2025-01-21T15:38:35.000Z' },
  { title:'Mr.',   firstName:'Marius',             lastName:'Marian Bran',       email:'marinbran8@gmail.com',               mobile:'07564038872',  enquiringAbout:'Other Courses', otherCourses:['Functional Skills English','Functional Skills Mathematics'], submittedAt:'2025-01-21T15:36:49.000Z' },
  { title:'Mr.',   firstName:'Hamza',              lastName:'Shafiq',            email:'hamza.data24@gmail.com',             mobile:'07424540509',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-03T12:05:29.000Z' },
  { title:'Mr.',   firstName:'Iosif-Mihai',        lastName:'Lorin',             email:'Abelstanciu7@gmail.com',             mobile:'07743658954',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-03T12:05:04.000Z' },
  { title:'Mrs.',  firstName:'Benish',             lastName:'Pervaiz',           email:'benishpervaiz2020@gmail.com',        mobile:'07424674728',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-03T12:04:34.000Z' },
  { title:'Mr.',   firstName:'Imran',              lastName:'Shahzad Choudhary', email:'imran.braintech@gmail.com',          mobile:'07427615963',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:04:09.000Z' },
  { title:'Mr.',   firstName:'Fazal E',            lastName:'Raheem',            email:'Fazaleraheem8@gamil.com',            mobile:'07903195864',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:03:52.000Z' },
  { title:'',      firstName:'Waseem',             lastName:'Ghazanfar',         email:'ghazanfarwaseem4@gmail.com',         mobile:'07500341595',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:03:30.000Z' },
  { title:'Mr.',   firstName:'Urhum',              lastName:'Habib',             email:'abuurhumconstruction@gmail.com',     mobile:'07565988101',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:03:12.000Z' },
  { title:'',      firstName:'Munawar Islam',      lastName:'Rao',               email:'munawarirao@gmail.com',              mobile:'07943190915',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:02:55.000Z' },
  { title:'Mr.',   firstName:'Muhammad Adil',      lastName:'Zubair',            email:'adilzubair846@gamil.com',            mobile:'07446208934',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:02:37.000Z' },
  { title:'Mr.',   firstName:'Daniyal',            lastName:'Bhatti',            email:'danirajpoot325@gmail.com',           mobile:'07405299718',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:02:16.000Z' },
  { title:'Mr.',   firstName:'Mohammad Zain',      lastName:'Ahmed',             email:'Pds.dle1@gmail.com',                 mobile:'07865679277',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:01:53.000Z' },
  { title:'Miss',  firstName:'Omowunmi',           lastName:'Olamide',           email:'kandf@yahoo.co.uk',                  mobile:'07341609530',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:01:27.000Z' },
  { title:'Miss',  firstName:'Afia',               lastName:'Ismail',            email:'ismailafia2014@gmail.com',           mobile:'07747390947',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:00:58.000Z' },
  { title:'Miss',  firstName:'Naureen',            lastName:'Khan',              email:'itz_koherkhan@hotmail.com',          mobile:'07449515091',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:00:36.000Z' },
  { title:'Mr.',   firstName:'Irfan',              lastName:'Ashraf',            email:'irfanashraf9276@gmail.com',          mobile:'07459531349',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T16:00:13.000Z' },
  { title:'Miss',  firstName:'Noor',               lastName:'Fatima',            email:'noorfatima9727@gmail.com',           mobile:'07301438031',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T15:59:45.000Z' },
  { title:'Mr.',   firstName:'Akif Farooq',        lastName:'Rashid',            email:'akif_786@live.com',                  mobile:'07411344033',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T15:59:20.000Z' },
  { title:'Mr.',   firstName:'Farooq',             lastName:'Rashid',            email:'farooq9.3.69@gmail.com',             mobile:'07462348259',  enquiringAbout:'ATHE Level 4 Extended Diploma in Business and Management',                 otherCourses:[], submittedAt:'2024-10-01T15:58:06.000Z' },
];

// ── English & IELTS Application rows (from application-form-english-and-ielts-programme-2026-05-31.csv) ──
const IELTS_ROWS = [
  {
    title: 'Mr.',
    firstName: 'Rameen',
    lastName: 'Rameen',
    sex: 'Female',
    dob: '2025-05-06',
    mobile: 'Rameen',
    email: 'rameen@trenteducation.co.uk',
    emergencyContact: 'Rameen',
    addressLine1: 'Rameen',
    addressLine2: 'Rameen',
    city: 'Rameen',
    stateProvince: 'Rameen',
    postCode: 'Rameen',
    country: 'Andorra',
    nextOfKinName: 'Rameen',
    nextOfKinRelationship: 'Rameen',
    nextOfKinTelephone: 'Rameen',
    nationalInsurance: 'Rameen',
    passportNumber: 'Rameen',
    ukResident3Years: 'Yes',
    nationality: 'Afghan',
    ethnicity: 'Any other White background',
    visaStatus: 'EEA or Swiss national',
    shareCode: '',
    course: 'ESOL (English for Speakers of Other Languages)',
    privacyAgreed: true,
    coursePrice: '£1.00',
    submittedAt: '2025-05-14T15:09:21.000Z',
  },
];

// ── Seed function ──────────────────────────────────────────────────────────────
export function importHistoricalData() {
  let existing = [];
  try {
    existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    existing = [];
  }

  // Deduplicate: skip rows already in storage (match by email + submittedAt)
  const existingKeys = new Set(
    existing.map(e => `${(e.email || '').toLowerCase()}|${e.submittedAt}`)
  );

  const toAdd = [];

  // Add enquiry rows
  ENQUIRY_ROWS.forEach((row, i) => {
    const key = `${(row.email || '').toLowerCase()}|${row.submittedAt}`;
    if (existingKeys.has(key)) return;
    toAdd.push({
      id: `hist-enq-${i}-${Date.now()}`,
      formType: 'Enquiry Form',
      status: 'reviewed',
      ...row,
    });
  });

  // Add IELTS rows
  IELTS_ROWS.forEach((row, i) => {
    const key = `${(row.email || '').toLowerCase()}|${row.submittedAt}`;
    if (existingKeys.has(key)) return;
    toAdd.push({
      id: `hist-ielts-${i}-${Date.now()}`,
      formType: 'English & IELTS Application',
      status: 'reviewed',
      ...row,
    });
  });

  if (toAdd.length === 0) return 0;

  // Merge: historical data goes to the end (oldest), new on top
  const merged = [...existing, ...toAdd].sort(
    (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return toAdd.length;
}
