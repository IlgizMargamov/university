package telegram;

import com.common.deck.Deck;
import com.common.deck.DeckType;
import com.common.gamelogic.BaseGameLogic;
import com.common.player.BasePlayer;
import com.games.fool.FoolAI;
import com.games.fool.FoolLogic;
import com.games.pharaoh.PharaohAI;
import com.games.pharaoh.PharaohLogic;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentLinkedQueue;

import static com.common.gamelogic.AnswerToPlayer.*;


public class Lobby implements Runnable {
    public String m_creator;
    public String m_pin;
    public List<BasePlayer> m_playerList;
    public GameLogicToBot m_gameLogicToBot;
    public Game m_game;
    public Map<String, String> m_playerNameToChatId;
    public ConcurrentLinkedQueue<Message> m_playersMessages;

    private BaseGameLogic m_gameLogic;
    private boolean m_gameStarted;
    private String m_expectedPlayer;
    private String[] m_availableCommandsInGame;
    private Thread m_gameThread;
    private boolean m_isVisible =true;
    private DeckType m_deckType = DeckType.MEDIUM;

    private final String createCommand = "/create";
    private final String pinCommand = "/pin";
    private final String helpCommand = "/help";
    private final String closeLobbyCommand = "/close_lobby";
    private final String showPlayersCommand = "/show_players";
    private final String showGameInfoCommand = "/show_game";
    private final String startGameCommand = "/start_game";
    private final String establishDeckType = "/establish_deck_type";
    private final String whatIsTrumpCommand = "/what_is_trump";
    private final String whatOnTheTableCommand = "/what_on_table";
    private final String cardsInDeckCommand = "/cards_in_deck";
    private final String leaveLobbyCommand = "/leave_lobby";
    private final String quitGameCommand = "/quit_game";
    private final String playWithBotCommand = "/play_with_bot";
    private final String startPrefix = "/start";
    private final String bot = "bot";
    private final String[] m_defaultCommands = {whatIsTrumpCommand, whatOnTheTableCommand, cardsInDeckCommand, quitGameCommand};
    private final String smallDeck = DeckType.SMALL.toString().toUpperCase();
    private final String mediumDeck = DeckType.MEDIUM.toString().toUpperCase();
    private final String bigDeck = DeckType.BIG.toString().toUpperCase();
    private final String[] deckTypes = {smallDeck, mediumDeck, bigDeck};
    private final String[] availableCommands = {helpCommand, pinCommand, showPlayersCommand, showGameInfoCommand, establishDeckType, playWithBotCommand, startGameCommand, closeLobbyCommand, leaveLobbyCommand};

    public Lobby(String creator, String chatId, String pin, List<BasePlayer> playersList, GameLogicToBot gameLogicToBot, Game wishedGame) {
        m_creator = creator;
        m_pin = pin;
        m_playerList = playersList; // creator already there
        m_gameLogicToBot = gameLogicToBot;
        m_game = wishedGame;
        m_playerNameToChatId = new HashMap<>();
        m_playersMessages = new ConcurrentLinkedQueue<>();
        m_playerNameToChatId.put(creator, chatId);
        sendOutputToUser(creator, availableCommands, INVITE_FRIENDS_USING_PIN.getMsg() + m_pin, true);
    }

    @Override
    public void run() {
        while (true) {
            while (!m_playersMessages.isEmpty()) {
                Message message = m_playersMessages.poll();
                if (!m_gameStarted) {
                    if (ifLobbyJustCreated(message)) continue; // to skip first message to lobby for each player
                    ifPlayerAsksToPlayWithBot(message);
                    ifPlayerChangesVisibility(message);
                    ifPlayerLeavesLobby(message);
                    ifPlayerAsksPin(message);
                    ifPlayerAsksToSeePlayersInLobby(message);
                    ifPlayerAsksGameInfo(message);
                    ifPlayerAsksHelp(message);
                    ifPlayerInitsChoosingDeckType(message);
                    ifPlayerChoosesDeckType(message);
                    ifGameStarts(message);

                } else { // in-game logic
                    if (message.m_message.startsWith(startPrefix)) continue;
                    m_expectedPlayer = m_gameLogicToBot.getCurrentPlayer();
                    m_availableCommandsInGame = m_gameLogicToBot.getAvailableCommands();
                    if (ifPlayerQuits(message)) return;
                    if (message.m_playerName.equals(m_expectedPlayer)) { // message from the awaited player
                        //sendOutputToUser(message.m_playerName, new String[]{"You are playing"}, message.m_message, true);
                        establishCommandCorrectness(message);
                    } else {
                        sendOutputToUser(message.m_playerName,
                                m_defaultCommands,
                                NOT_YOUR_TURN.getMsg() + TRY_AGAIN.getMsg(),
                                true);
                    }
                }
            }
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private void ifPlayerAsksToPlayWithBot(Message message) {
        if (isEquals(message, playWithBotCommand)){
            switch (m_game){
                case FOOL -> m_playerList.add(new FoolAI(bot));
                case PHARAOH -> m_playerList.add(new PharaohAI(bot));
            }

            sendOutputToUser(m_creator, availableCommands, BOT_ADDED.getMsg(), true);
        }
    }

    private void ifPlayerAsksHelp(Message message) {
        if (isEquals(message, helpCommand)){
            switch (m_game){
                case FOOL -> sendOutputToUser(message.m_playerName, availableCommands, HOW_TO_PLAY_FOOL.getMsg(), true);
                case PHARAOH -> sendOutputToUser(message.m_playerName, availableCommands, HOW_TO_PLAY_PHARAOH.getMsg(), true);
            }
        }
    }

    private void ifPlayerChangesVisibility(Message message) {
        if (isEquals(message, closeLobbyCommand)){
            setLobbyVisibility(false);
            m_gameLogicToBot.sendOutputToAllUsers(m_playerNameToChatId.keySet(),
                    availableCommands, AT.getMsg()+ message.m_playerName + HAVE_CLOSED_LOBBY.getMsg());
        }
    }

    public boolean getLobbyVisibility(){ return m_isVisible; }

    private void establishCommandCorrectness(Message message) {
        boolean correctCommand = isCorrectCommand(message);
        if (!correctCommand)
            sendOutputToUser(message.m_playerName,
                    m_defaultCommands,
                    WRONG_COMMAND.getMsg() + TRY_AGAIN.getMsg(),
                    true);
    }

    private boolean isCorrectCommand(Message message) {
        boolean correctCommand = false;
        for (String availableCommand : m_availableCommandsInGame) {
            if (availableCommand.equals(message.m_message)) {
                sendInputToGameLogic(message.m_message);
                correctCommand = true;
                break;
            }
        }
        return correctCommand;
    }

    private boolean ifPlayerQuits(Message message) {
        if (isEquals(message, quitGameCommand)) {
            m_gameStarted = false;
            sendOutputToUser(message.m_playerName, availableCommands, YOU_LEFT.getMsg() + m_creator + LOBBY.getMsg(), true);
            m_gameLogicToBot.killLobby(m_pin);
            return true;
        }
        return false;
    }

    private boolean ifLobbyJustCreated(Message message) {
        if (message.m_message.startsWith(createCommand)) {
            sendOutputToUser(message.m_playerName,
                    availableCommands,
                    YOU_HAVE_ENTERED.getMsg() + m_creator + LOBBY.getMsg() + USE_BUTTONS.getMsg(),
                    true);
            return true;
        }
        return false;
    }

    private void ifGameStarts(Message message) {
        if (isEquals(message, startGameCommand)) {
            getPlayersList();
            establishAndStartGameThread();
        }
    }

    private void ifPlayerInitsChoosingDeckType(Message message) {
        if (isEquals(message, establishDeckType)) {
            sendOutputToUser(
                    message.m_playerName,
                    deckTypes,
                    CHOOSE_TYPE_OF_DECK.getMsg(),
                    true);
        }
    }

    private void ifPlayerAsksGameInfo(Message message) {
        if (isEquals(message, showGameInfoCommand))
            sendOutputToUser(message.m_playerName, availableCommands, getGameInfo(), true);
    }

    private void ifPlayerAsksToSeePlayersInLobby(Message message) {
        if (isEquals(message, showPlayersCommand))
            sendOutputToUser(message.m_playerName,
                    availableCommands,
                    CURRENT_PLAYERS.getMsg() + getPlayersInLobby(),
                    true);
    }

    private void ifPlayerAsksPin(Message message) {
        if (isEquals(message, pinCommand))
            sendOutputToUser(message.m_playerName,
                    availableCommands,
                    LOBBY_PIN.getMsg() + m_pin,
                    true);
    }

    private void ifPlayerLeavesLobby(Message message) {
        if (isEquals(message, leaveLobbyCommand)) {
            sendOutputToUser(message.m_playerName, availableCommands, YOU_LEFT.getMsg() + m_creator + LOBBY.getMsg(), true);
            m_playerNameToChatId.remove(message.m_playerName);
        }
    }

    private void ifPlayerChoosesDeckType(Message message) {
        for (String deckType : deckTypes) {
            if (isEquals(message, deckType)) {
                m_deckType = DeckType.getDeckType(deckType);
                m_gameLogicToBot.sendOutputToAllUsers(m_playerNameToChatId.keySet(),
                        availableCommands, DECK_HAS_BEEN_SET.getMsg() + m_deckType + BY.getMsg() + message.m_playerName);
                break;
            }
        }
    }

    private void getPlayersList() {
        Set<String> players = m_playerNameToChatId.keySet();
        for (String playerName : players) {
            m_playerList.add(new BasePlayer(playerName));
        }
    }

    private void establishAndStartGameThread() {
        switch (m_game) {
            case FOOL -> m_gameLogic = new FoolLogic(getBasePlayerArray(m_playerList), new Deck(m_deckType), m_gameLogicToBot);
            case PHARAOH -> m_gameLogic = new PharaohLogic(getBasePlayerArray(m_playerList), new Deck(m_deckType), m_gameLogicToBot);
            default -> throw new IllegalStateException();
        }
        m_gameThread = new Thread(m_gameLogic);
        m_gameStarted = true;
        m_gameLogicToBot.sendOutputToAllUsers(m_playerNameToChatId.keySet(), m_availableCommandsInGame, GAME_HAS_STARTED.getMsg());
        try {
            Thread.sleep(50);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        m_gameThread.start();
    }

    private void sendInputToGameLogic(String m_message) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < m_message.length(); i++) {
            if (m_message.charAt(i) == '.') break;
            result.append(m_message.charAt(i));
        }
        m_gameLogicToBot.setInputMessage(result.toString());
    }

    private void sendOutputToUser(String playerName, String[] availableCommands, String text, boolean commandsInRows) {
        m_availableCommandsInGame = availableCommands;
        m_gameLogicToBot.sendOutputToUser(playerName, availableCommands, text, commandsInRows, false);
    }

    private BasePlayer[] getBasePlayerArray(List<BasePlayer> playerList) {
        BasePlayer[] players = new BasePlayer[playerList.size()];
        for (int i = 0; i < playerList.size(); i++) {
            players[i] = playerList.get(i);
        }

        return players;
    }

    private boolean isEquals(Message message, String command) {
        return message.m_message.equals(command);
    }

    private void setLobbyVisibility(boolean isVisible){ m_isVisible =isVisible;}

    private String getGameInfo() {
        return String.format(LOBBY_CREATOR.getMsg() + "%s\n" +
                LOBBY_PIN.getMsg() + "%s\n" +
                PLAYERS.getMsg() + getPlayersInLobby() +
                GAME.getMsg() + "%s\n" +
                DECK_TYPE.getMsg() + "%s", m_creator, m_pin, m_game, m_deckType);
    }

    private String getPlayersInLobby() {
        StringBuilder players = new StringBuilder(OPEN_BRACE_LINE.getMsg());
        for (String playerName : m_playerNameToChatId.keySet()) {
            players.append(AT.getMsg()).append(playerName).append(LINE.getMsg());
        }
        players.append(CLOSE_BRACE_LINE.getMsg());

        return players.toString();
    }
}
