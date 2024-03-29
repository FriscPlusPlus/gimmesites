const chalk = require("chalk");

module.exports = function logo() {
  console.clear(); // clear console, for a better view
  console.log(
    chalk.hex("#FF003C")(`
    ______ _____ _______ _______ _______ _______ _____ _______ _______ _______
   |  ____   |   |  |  | |  |  | |______ |______   |      |    |______ |______ {V1.0.0#beta}
   |_____| __|__ |  |  | |  |  | |______ ______| __|__    |    |______ ______| By Firas Jelassi (https://github.com/FriscPlusPlus)
  
   This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
   without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
   See the GNU General Public License v3.0 for more details at http://www.gnu.org/licenses/gpl-3.0.html.
  `)
  );
};
