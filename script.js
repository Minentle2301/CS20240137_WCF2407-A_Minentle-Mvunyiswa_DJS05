class Store { constructor()
     { this.state = { count: 0 };
       this.listeners = [];
     }

// Returns the current state
getState() {
    return this.state;
}

// Dispatches an action and updates the state accordingly
dispatch(action) {
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
    this.notifyListeners();
}

// Subscribes to state changes
subscribe(listener) {
    this.listeners.push(listener);
}

// Notifies all listeners about the state change
notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
}
}

// Create a new store instance
 const store = new Store();

// Subscribe to state changes 
store.subscribe((newState) => { console.log('New State:', newState); });

// Scenario 1: Initial State Verification
 console.log('Initial State:', store.getState()); // Should log: { count: 0 }

// Scenario 2: Incrementing the Counter 
store.dispatch({ type: 'ADD' }); // First ADD action 
store.dispatch({ type: 'ADD' }); // Second ADD action

// Scenario 3: Decrementing the Counter
 store.dispatch({ type: 'SUBTRACT' }); // SUBTRACT action

// Scenario 4: Resetting the Counter 
store.dispatch({ type: 'RESET' }); // RESET action