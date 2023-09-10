import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import styles from "./page.module.css"
import { Fira_Mono, Poppins } from 'next/font/google'
import previewImage from "@/public/preview.png"

const poppins = Poppins({subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']})
export default function Home() {
  return (
    <main>
      <Navbar/>
      <div className={styles.jumbotron}>
        <img className={styles.icon} src="/icon.svg"/>

        <p className={styles.megaText}>
          <span className={styles.quote}>“</span>
          Nuake is a modern engine inspired by <br/> the Quake engine.
          <span className={styles.quote}>”</span>
        </p>

        <p className={[styles.subText, poppins.className].join(" ")}>
          Built upon time-tested technologies with a modern flavor. Nuake is in active development and is ever-evolving.
        </p>

        <a href="/">
          <div className={styles.joinBtn}>
            enter alpha
          </div>
        </a>

        <Image src={previewImage} style={{width: "100%"}} className={styles.previewImg} alt="Editor"/>
      </div>
      <div className={styles.featureSection}>
          <div className={styles.featureList}>
          <h1 className={styles.featureTitle}>Features</h1>
            <div className={styles.featureItem}>
              <div className={styles.featureItemL}>
                <p className={styles.featureName}>Trenchbroom integration</p>
                <p className={[styles.desc, poppins.className].join(" ")}>
                Nuake supports hot-reloading level edition with trenchbroom. It also supports BSPs for better performance.
                </p>
              </div>
              <div className={styles.featureItemR}>
                <Image style={{width: "100%"}} alt="Trenchbroom" src={previewImage}/>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureItemL}>
              <img src="/preview.png"></img>
              </div>
              <div className={styles.featureItemR}>
                <p className={styles.featureName}>Jolt physics</p>
                <p className={[styles.desc, poppins.className].join(" ")}>
                  Harness the power of one of the newest physics engine available featured in modern game engines that has shipped in games like Horizon Zero Dawn.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureItemL}>
                <p className={styles.featureName}>Wren scripting</p>
                <p className={[styles.desc, poppins.className].join(" ")}>
                  Increase your iteration times with Wren. An OSS object-oriented scripting language that is vastly superior than other scripting language like lua.
                </p>
              </div>
              <div className={styles.featureItemR}>
                <img src="/preview.png"></img>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureItemL}>
              <img src="/preview.png"></img>
              </div>
              <div className={styles.featureItemR}>
                <p className={styles.featureName}>Modern Rendering</p>
                <p className={[styles.desc, poppins.className].join(" ")}>
                  Nuake features a modern renderer that is capable of rendering high-fidelity graphics with modern post-processing effects. You can customize the render pipeline to achieve the look you want.
                </p>
              </div>
            </div>
            <h1 className={poppins.className}>And more!</h1>
          </div>
      </div>
      
      <div className={styles.faqWrapper}>
        <div className={styles.faqContainer}>
          <p className={styles.faqTitle}>Frequently Asked Questions</p>

          <p className={styles.faqQuestion}>
            When will it be done? 
          </p>
          <p className={[styles.faqAnswer, poppins.className].join(" ")}>
            Probably never, we have a roadmap that helps us plan our goals. Our current goal is to be able to remake Quake inside of Nuake. 
          </p>

          <p className={[styles.faqQuestion].join(" ")}>
            Is it free? 
          </p>
          <p className={[styles.faqAnswer, poppins.className].join(" ")}>
            Nuake is currently free and open-source.
          </p>

          <p className={styles.faqQuestion}>
            Can I make my game in Nuake? 
          </p>
          <p className={[styles.faqAnswer, poppins.className].join(" ")}>
            We are currently not in alpha, meaning that it is not recommended to make games with Nuake at the moment. Feel free to check it out and play with it, but it is currently heavily in development and breaking changes are to be expected until we hit alpha. 
          </p>

          <p className={styles.faqQuestion}>
            What are the minimum requirements?  
          </p>
          <p className={[styles.faqAnswer, poppins.className].join(" ")}>
            No minimum system requirements have been determined at the moment. At the very least, your GPU should support OpenGL 4.5.
          </p>

          <p className={styles.faqQuestion}>
            It keeps crashing!  
          </p>
          <p className={[styles.faqAnswer, poppins.className].join(" ")}>
            Crashes and bugs are to be expected until we hit our current alpha goals, feel free to report your crashes and reproduction steps on the github.
          </p>

          <p className={styles.faqQuestion}>
            Why?   
          </p>
          <p className={[styles.faqAnswer, poppins.className].join(" ")}>
            Why not? 🙂
          </p>


          <p className={styles.words}>
            Hi👋 <br/>
            <br/>
            I'm Antoine, main developer of Nuake.<br/>
            <br/>
            I'd like to leave a little note here explaining what this projects means to me.<br/>
            <br/>
            I started this project ~2 years ago as a way to learn graphics programming and I never stopped working on it. <br/>
            Eventually it turned into a game engine!<br/>
            <br/>
            I've always been a fan of the Quake mapping community and I feel like the workflow of creating Quake levels is one of the nicest and most rewarding way to learn game developement.<br/>
            <br/>
            After moving to other game engines(like Unity, Unreal and Godot) that spark and that spontaneity got lost through the friction that these generic game engines created.<br/>
            <br/>
            Nuake is <i><b>my</b></i> attempt at creating a game engine that aims to keep that spark and joy of simply creating, without the friction.<br/>
            <br/>
            While Nuake is not at that point <i>yet</i>, I heavily encourage you to check out the quake mapping community by joining their discord: <br/>
            <br/>
            <u><a href="https://discord.gg/Zrczfg2NCD">https://discord.gg/Zrczfg2NCD</a></u> <br/>
            <br/>
            Thank you❤️
          </p>

          
        </div>
        <img className={styles.footer} src="/nuake-logo.svg"></img>
      </div>
      
    </main>
  )
}
