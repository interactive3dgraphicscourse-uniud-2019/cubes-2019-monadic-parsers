# Journal
Questo documento tiene traccia del processo di sviluppo del progetto di grafica 3D, elencando le modifiche effettuate e le soluzioni implementate.
## Decisioni di sviluppo
Questa sezione si occupa di elencare e descrivere le motivazioni delle varie decisioni implementative e di design prese per il progetto in questione.
### Requisiti base
Il progetto parte dall'idea di implementare una versione in tre dimensioni del popolare "Gioco della vita", basandosi sulle regole della versione 2D e adattando il sistema alle direttive dateci alla consegna del progetto. Il progetto prevederà le seguenti attività di base:
* L'implementazione di un algoritmo per la risoluzione del gioco della vita e la sua visualizzazione in uno spazio 3D
*  Un menù, sempre visualizzato in 3D sfruttando un font creato ad-hoc
*  Un HUD che dovrà mostrare all'utente:
	* Le statistiche relative alle prestazioni del sistema
	* I comandi per andare ad agire sul sistema
	* Le opzioni selezionate per il gioco in corso
* La colorazione dei cubi presenti nella scena
* Un terreno

In aggiunta, l'utente avrà a disposizione molteplici funzioni, che prevedono:
* La rotazione della camera attorno alla scena di gioco
* La rotazione della scena di gioco rispetto a se stessa di 45 gradi sugli assi x e y
* La possibilità di modificare le impostazioni di gioco (tramite un menù)
* Una funzione di 'esplosione', che lancia i cubi di gioco in direzioni diverse rispetto al centro della scena, sfruttando anche la gravità

### Requisiti aggiuntivi
Oltre ai requisiti base, si pensava di: 
* Aggiungere shader e luci per rendere la scena più dinamica
* Andare ad agire sulle colorazioni dei cubi tramite l'utilizzo delle funzioni di trasparenza e opacità
* Aggiungere una gestione della camera che prevede l'utilizzo della camera ortogonale
* Creare un font che verrà utilizzato per il testo del menù
* Aggiungere delle animazioni al menù quando si cambia pagina o si seleziona un campo da modificare


## Proposte e loro valutazione
Questa sezione si occupa di raccogliere varie proposte implementative con conseguente analisi.
### Schermo intero
Viene proposta la visualizzazione del sistema a schermo intero.

**Pro**
* Più spazio per la scena

**Contro**
* Non è davvero necessario, può infastidire alcuni utenti

### Schermata iniziale
Viene discussa l'idea di mostrare una schermata iniziale del gioco, con un titolo e una descrizione, prima di accedere alla scena vera e propria, che richiede all'utente di  premere il tasto invio per cominciare. 

**Pro**
* Semplice da implementare
* Esteticamente piacevole

**Contro**
* Di per sé la schermata non aggiunge nulla al gioco
* Può essere fastidioso quando il sistema viene avviato più volte

Dopo una discussione, si è deciso di evitare questa scelta e far apparire direttamente la scena di gioco.

### HUD
Viene discussa la composizione del HUD, ossia cosa aggiungere e rendere visibile all'utente e cosa invece non mostrare. Inoltre viene deciso dove posizionare gli elementi.
#### Opzioni
Si propone di mostrare a schermo le opzioni impostate per il gioco corrente, preferibilmente nell'angolo in alto a destra della scena.
#### Comandi
Viene proposto di rendere sempre visibile all'utente una indicazione del comando di help (del tipo 'premere h per l'elenco dei comandi'), in basso a destra. Assieme ad esso, si pensa di aggiungere una indicazione analoga per il comando che apre il menù delle opzioni.

Viene deciso di mostrare sia comandi che opzioni, come descritto in precedenza, oltre alle statistiche, in alto a sinistra.

**Pro**
* L'utente visualizza tutte le informazioni necessarie

**Contro**
* Viene occupato dello spazio altrimenti sfruttato per la scena
* Troppe informazioni possono confondere l'utente

Viene aggiunta quindi la possibilità di nascondere o visualizzare l'HUD tramite un pulsante.
### Menù
Viene discusso il design e l'implementazione del menù delle opzioni.
#### Inserimento
Viene proposto l'inserimento dei dati sia tramite inserimento numerico diretto che tramite incremento.

**Pro**
* Più opzioni

**Contro**
* Può non essere chiaro
* Inutile in certe situazioni

#### Animazioni
Vengono proposte delle animazioni per il menù:
* Comparsa di due frecce indicanti la possibilità di incrementare/decrementare il valori
* Illuminazione dell'opzione selezionata
* Lieve oscillazione dell'opzione selezionata

**Pro**
* Esteticamente piacevole
* Selezione più chiara

**Contro**
* Ridondaza (o illuminazione o oscillazione)
* Troppe animazioni possono essere fastidiose

### Terreno
Viene proposta una conformazione del terreno a piramide cava inversa, ossia con la punta verso il basso. La matrice di cubi verrà posizionata sopra ad essa. I cubi vengono colorati e visualizzati in trasparenza.

### Esplosione
La proposta per la funzione di esplosione prevede l'utilizzo della formula fisica del moto del proiettile con vettore iniziale di ogni cubo direzionato partendo dall'origine, applicato alla pressione di un tasto specifico. Inoltre, si applica la gravità. L'esplosione coinvolge sia la matrice di cubi sia il terreno.

### Colorazione
Per quanto riguarda la colorazioni dei cubi è stato deciso di assegnare i colori in base alla durata della vita di ogni cubo:
* Tendente al verde se ha il numero giusto di vicini per poter sopravvivere al prossimo turno
* Tendente al rosso se morirà poichè ha troppi vicini
* Tendente al blu se morirà poichè ha troppi pochi vicini

Inoltre, è stato scelto di utilizzare lo spazio colori HSL per indicare i colori dei voxel per due motivi:
- La possibilità di modificare la tinta del colore mantenendo invariata luminosità e saturazione
- Maggiore semplicità per la variazione della configurazione dei colori (iterativa) senza dover effettuare la conversione nello spazio RGB

### Convenzioni sui pulsanti
Viene proposta una legenda dei comandi da dare al sistema per effettuare determinate azioni, riportate poi nell'help del programma.
* ← → ↑ ↓ : rotazione della matrice di gioco di 45 gradi nella direzione indicata
* . (punto) : allineamento della martice di gioco con la camera
* Enter : fare avanzare il gioco di un passo
* A : il gioco avanza automaticamente secondo l'impostazione di tempo inserita
* P : apre il menù delle opzioni
* H : apre un aiuto che mostra tutti i comando
* R : reinizializza la matrice di gioco con valori casuali
* X : visualizza/nascondi HUD
* E : esplosione della matrice di gioco

## Modifiche

#### Menù
L'idea originale sarebbe stata quella di creare un menù su più pagine nella scena che permetteva modifica e inserimento di opzioni di gioco, sfruttando una camera ortogonale aggiuntiva. Per motivi di tempo, è stato deciso di optare per un menù creato in HTML, esterno. Le opzioni sono divise per sezione, e saranno modificabili tramite slider o inserimento. Inoltre si può scegliere di aprire o chiudere il menu tramite un pulsante posizionato in alto a destra della scena.

Si è poi deciso di sostituire il pannello dat.gui usato in precedenza con quello attuale, perché si adatta meglio alla dimensione dello schermo e la visualizzazione risulta corretta anche su altri dispositivi (tablet e smartphone).

#### HUD
Dopo una discussione, si è deciso di posizionare gli elementi del HUD nel seguente modo:
* Statistiche in alto a sinistra
* Comandi per help e opzioni in alto a destra
* Opzioni correnti in basso al centro, su due righe

Questo per mantenere una simmetria, oltre che per il fatto che posizionare le opzioni della scena sotto la scena stessa aumenta la leggibilità.

Dopo una successiva analisi, si è optato per rimuovere le indicazioni in alto a destra e invece posizionare il menù.

#### Camera
È stato deciso di lasciare la possibilità all'utente di ruotare la camera liberamente, senza aggiungere comandi per la rotazioni predefinite di questa. Questo per non sovraccaricare l'utente con troppi comandi non necessari e perchè si manifestavano dei conflitti con OrbitControls.js, parte di codice già presente e necessaria.
In compenso, ora si può scegliere di visualizzare la scena con una camera ortogonale.

#### Pulsanti
Dato che si è deciso di rimuovere il menù, il pulsante "P" verrà utilizzato per cambiare la camera di visualizzazione della scena da prospettica ad ortogonale e viceversa.

## Progressi
#### 26/03/2019
* Implementazione dell'algoritmo del gioco della vita;
* Visualizzazione della scena;
* Aggiunta della possibilità di modificare le impostazioni;

#### 29/03/2019
* Aggiunta funzione di rotazione della camera;
* Aggiunta funzionalità di rotazione della matrice di cubi;

#### 30/03/2019
* Aggiunta di colori e trasparenze;
* Creazione terreno e bitmap;
* Aggiunta della funzione di esplosione;
* Creazione del font ad-hoc;

#### 31/03/2019
* Applicate migliorie alla funzione di esplosione;
* Aggiunta dell'esplosione del terreno;
* Loader dei font;
* Aggiunta HUD;
* Creazione dei caratteri del font in 3D;
* Creazione layout menù;

#### 01/04/2019
* Miglioramento HUD;
* Risolto alcuni bug relativi alla colorazione;
* Aggiunte voci al menù di aiuto;

#### 02/04/2019
* Corretto l'orientamento dell'esplosione;
* Aggiunto il menù delle opzioni;
* Aggiunta la possibilità di usare una camera ortogonale;

#### 03/04/2019
* Miglioramento del menù delle opzioni;

## Bug e soluzioni
#### Somma in Javascript
**Sintomo:** Fallimento del rendering dei colori delle celle, crash dopo l'aggiornamento dei parametri.

**Problema:** Durante l'implementazione, è stato necessario effettuare un confronto utilizzando l'operatore di somma. Dato un tipo ambiguo, l'operazione somma tra un tipo ambiguo e uno numerico da come risultato una stringa; viene eseguita una concatenazione invece che una somma, poiché considera il tipo ambiguo come una stringa e non come un numero.

**Risoluzione:**  È stato forzato il cast verso interi del tipo ambiguo tramite operatori matematici.

#### Colorazione della matrice di cubi
**Sintomo:** La colorazione dei cubi non sembrava corretta, nonostante ci fossero molti cubi vicini il colore  rimaneva giallo senza tendere mai al rosso.

**Problema:** Analogo al problema della somma descritto in precedenza, ma di più difficile rilevazione, dato che non venivano segnalati errori sulla console di output.

**Risoluzione:** È stato forzato il cast verso interi della variabile coinvolta tramite operatori matematici.

#### Mesh
**Sintomo:** L'aggiornamento dei colori non dà il risultato aspettato.

**Problema:** Non è possibile creare un unico materiale, assegnarlo ai cubi e aggiornare poi solo il colore.

**Risoluzione:** Vengono inizialmente creati tutti i materiali definendo il colore e per l'aggiornamento si modifica il materiale assegnato ai cubi.

#### Caricamento font
**Sintomo:** La funzione di caricamento dei font restituisce un valore indefinito.

**Problema:** Per il caricamento dei file contenenti le matrici dei font, viene utilizzato un loader specifico dentro una funzione. La funzione dovrebbe restituire una matrice, ma siccome l'operazione necessaria alla creazione della matrice viene eseguita all'interno della funzione di loading, questa restituisce un valore indefinito, poiché siamo in ambiente asincrono e la prima operazione viene eseguita quando il dato necessario non è ancora pronto.

**Risoluzione:** Utilizzo di una variabile globale per memorizzare i dati.

#### HUD
**Sintomo**: L'HUD non è reattivo con le dimensioni della pagina.

**Problema**: Per migliorare la visione dell'HUD si vuole che  questo sia sempre di una dimensione proporzionale a quella dello schermo in uso.

**Risoluzione**: Abbiamo sfruttato textures e canvas per rendere scalabile la scena.

#### Esplosione
**Sintomo**: Se l'esplosione avviene durante un movimento della matrice di cubi, questa non avviene corettamente.

**Problema**: L'esplosione durante un movimento avviene come se la matrice fosse stata nella posizione precedente al movimento.

**Risoluzione**: È stato aggiunto del codice per gestire questo caso, ora l'esplosione avviene correttamente anche se la matrice è in movimento.


#### Comandi in conflitto
**Sintomo**: Il comando di help non funziona correttamente.

**Problema**: Il tasto H viene utilizzato sia da noi per mostrare i comandi sia di default per nascondere il menù, quindi si verifica un conflitto.

**Risoluzione**: Eliminata la sezione di codice di default che utilizzava il tasto H per nascondere il menù opzioni.

### Compatibilità con  i browser
**Sintomo**: La scena di gioco non viene visualizzata correttamente utilizzando il browser Google Chrome.

**Problema**: Nel browser l'evento che carica il menù delle opzioni (PaperGUIRead) non viene triggerato.

**Risoluzione**: È stata inserita una funzione che tenta il caricamento del menù ad ogni frame fino alla sua riuscita, segnalata tramite flag.

