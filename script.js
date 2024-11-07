class Store { 
    constructor() { 
        this.state = { count: 0 }; 
        this.listeners = []; 
    }

    // Returns the current state
    getState() {
        return this.state;
    }

    // Dispatches an action and updates the state accordingly
    dispatch(action) {
        console.log(`Dispatching action: ${action.type}`); // Log the action type
        switch (action.type) {
            case 'ADD':
                this.state = { count: this.state.count + 1 };
                break;
            case 'SUBTRACT':
                this.state = { count: Math.max(this.state.count - 1, 0) }; // Prevent negative count
                break;
            case 'RESET':
                this.state = { count: 0 };
                break;
            default:
                console.warn(`Unknown action type: ${action.type}`);
                return;
        }
        console.log(`Updated State after ${action.type}:`, this.state); // Log the updated state
        this.notifyListeners();
    }

    // Subscribes to state changes
    subscribe(listener) {
        console.log("New listener added."); // Log when a listener is added
        this.listeners.push(listener);
    }

    // Notifies all listeners about the state change
    notifyListeners() {
        console.log("Notifying listeners..."); // Log when listeners are notified
        this.listeners.forEach(listener => listener(this.state));
    }
}

// Create a new store instance
const store = new Store();

// Subscribe to state changes 
store.subscribe((newState) => { 
    console.log('New State:', newState); 
});

// Scenario 1: Initial State Verification
console.log('Initial State:', store.getState()); // Should log: { count: 0 }

// Scenario 2: Incrementing the Counter
store.dispatch({ type: 'ADD' }); // First ADD action
store.dispatch({ type: 'ADD' }); // Second ADD action

// Scenario 3: Decrementing the Counter
store.dispatch({ type: 'SUBTRACT' }); // SUBTRACT action

// Scenario 4: Resetting the Counter
store.dispatch({ type: 'RESET' }); // RESET action
