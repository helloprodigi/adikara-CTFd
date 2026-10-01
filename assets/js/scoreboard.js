import Alpine from "alpinejs";
import CTFd from "./index";

window.Alpine = Alpine;
window.CTFd = CTFd;

// Default scoreboard polling interval to every 5 minutes
const scoreboardUpdateInterval = window.scoreboardUpdateInterval || 300000;

Alpine.data("ScoreboardList", () => ({
  standings: [],
  brackets: [],
  activeBracket: null,

  getStandings() {
    return this.standings.filter(i =>
      this.activeBracket ? i.bracket_id == this.activeBracket : true,
    );
  },

  getMine() {
    const accountId =
      CTFd.config.userMode === "teams" ? window.init.teamId : window.init.userId;
    const standings = this.getStandings();
    const index = standings.findIndex(i => i.account_id == accountId);
    return index >= 0 ? { ...standings[index], place: index + 1 } : null;
  },

  async update() {
    this.brackets = await CTFd.pages.scoreboard.getBrackets(CTFd.config.userMode);
    this.standings = await CTFd.pages.scoreboard.getScoreboard();
  },

  async init() {
    this.update();

    setInterval(() => {
      this.update();
    }, scoreboardUpdateInterval);
  },
}));

Alpine.start();
