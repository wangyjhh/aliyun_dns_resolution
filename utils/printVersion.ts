// print version
export const logv = (version: string) => {
    return `
      ___           ___           ___           ___     
     /\\  \\         /\\__\\         /\\  \\         /\\  \\    
    /::\\  \\       /::|  |       /::\\  \\       /::\\  \\   
   /:/\\:\\  \\     /:|:|  |      /:/\\ \\  \\     /:/\\:\\  \\  
  /:/  \\:\\__\\   /:/|:|  |__   _\\:\\~\\ \\  \\   /::\\~\\:\\  \\ 
 /:/__/ \\:|__| /:/ |:| /\\__\\ /\\ \\:\\ \\ \\__\\ /:/\\:\\ \\:\\__\\
 \\:\\  \\ /:/  / \\/__|:|/:/  / \\:\\ \\:\\ \\/__/ \\/_|::\\/:/  /
  \\:\\  /:/  /      |:/:/  /   \\:\\ \\:\\__\\      |:|::/  / 
   \\:\\/:/  /       |::/  /     \\:\\/:/  /      |:|\\/__/  
    \\::/__/        /:/  /       \\::/  /       |:|  |    
     ~~            \\/__/         \\/__/         \\|__|    
     
Modify Domain Records in Alibaba Cloud
VERSION: ${version}`
}
