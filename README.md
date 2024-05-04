## Program Description

This game helps developers and designers in understanding the RGB color scheme. It is an interactive game that can be so captivating due to its colors. UI inspiration from a tutorial video on Edureka YouTube channel. I added new features which makes the game more interactive.
A game over screen, confetti for when the users win and finally an animation that shakes the header texts when square choosen is wrong. This application is fully responsive.

## Technology Used.

- JavaScript
- CSS3
- HTML5
- Vercel App

### Concepts Learned.

- Good understanding of animations and how keyframes are used. From my understanding the Keyframe is used to state what the particular object is meant to do as specific time of the animation period. For this project I made use of the shake animation.

```css
@keyframe {nameOfAnimation) {
	0%, 100% {
		transform: translateX(0);
	}
	10%, 30%, 50%, 70%, 90% {
		transform: tranlateX(-10px);
	}
	20%, 40%, 60%, 80% {
		tranform: translateX(10px);
	}
}

/*then in the tag rule we define the animation on it using*/
animation: nameOfAnimation 0.5s eae-in-out;

```

![image](https://github.com/Chioma-Okeke/Guess-the-color/assets/75180541/d3520776-96e0-4f8b-ab0d-a4a986d8bad8)

![image](https://github.com/Chioma-Okeke/Guess-the-color/assets/75180541/e15faee5-7da2-4fd7-b7b4-edede5146e8d)

![image](https://github.com/Chioma-Okeke/Guess-the-color/assets/75180541/a0e76fad-0beb-4cb7-9154-0c790494cefb)


