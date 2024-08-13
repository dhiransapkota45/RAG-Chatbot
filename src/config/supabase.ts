import { createClient } from "@supabase/supabase-js";
import { config } from "./config";

export const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);

// class SupasBaseInit {
//   constructor() {
//     this.init();
//   }
//   private init() {
//     createClient(config.SUPABASE_URL, config.SUPABASE_KEY);
//   }
// }

// export const supabase1 = new SupasBaseInit();
