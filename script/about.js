class About {
	constructor(lang, selectorLabel, title, description) {
		this.lang = lang;
		this.selectorLabel = selectorLabel;
		this.title = title;
		this.description = description;
	}
}

const aboutLanguages = {
	"fr": new About("fr", "Langue", "A propos", "Blobby Blob est un projet de clone de Flappy Bird. Un défi que nous nous sommes lancés durant notre formation de Développeur Web et Web Mobile à PopSchool durant le mois de Juin 2022."),
	"en": new About("en", "Language", "About", "Blobby Blob is a Flappy Bird clone project. A challenge we started during our Web and Mobile Web Developer formation at PopSchool in June 2022"),
};

function updateAbout ()
{
	const aboutTitle = document.getElementById('about-title');
	const aboutDesc = document.getElementById('about-description');
	const langSelector = document.getElementById('language');
	const selectLabel = document.getElementById('selector-label');

	//console.log(langSelector.value);

	aboutTitle.innerHTML = aboutLanguages[langSelector.value].title
	aboutDesc.innerHTML = aboutLanguages[langSelector.value].description;
	selectLabel.innerHTML = aboutLanguages[langSelector.value].selectorLabel;

}

updateAbout();
