Overall I mostly tried to focus on the most important features rather than small optimizations so I think the result could be futher improved.

So firstly the genres should be cached and fetched server side, but I kinda had a bug there and did not manage to solve it in time and decided no to do the last time changes.

nuqs would be nice to implement for the url state, I read the bonus point later and decided to do it retrospectively, but ran out of time.

The design could be obviously improved, but I am pretty horrible at UI so I decided to just do barebone one. I picked daisyui since it seemed like the most lightweight option. In real project I would probably go for something heavier like MUI, but I think it might be too slow to implement due to the time constraints.

I don't think the code is particularly bad, buut could be further improved. Functions could be wrapped in callback to silent the eslint, some repetition is present (pagination buttons, etc). I would also prefer to make the code more modular by separating components into their own files, etc, but I tried to follow Pareto rule mostly.

Sidenote: I know not to push env file on github, but I pushed the API key so the app does not break for you.