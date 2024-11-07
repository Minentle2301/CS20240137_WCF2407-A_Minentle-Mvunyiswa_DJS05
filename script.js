class Store { 
    constructor() { 
        // Initialize the state with a count property set to 0
        this.state = { count: 0 }; 
        
        // Array to store functions (listeners) that will be called whenever state changes
        this.listeners = []; 
    }

    // Method to return the current state
    getState() {
        return this.state;
    }

    // Method to handle dispatched actions and update the state accordingly
    dispatch(action) {
        console.log(`Dispatching action: ${action.type}`); // Log the type of action received

        // Check the action type and update the state based on the action
        switch (action.type) {
            case 'ADD':
                // Increment the count by 1
                this.state = { count: this.state.count + 1 };
                break;
            case 'SUBTRACT':
                // Decrement the count by 1, but don't go below 0
                this.state = { count: Math.max(this.state.count - 1, 0) };
                break;
            case 'RESET':
                // Reset the count to 0
                this.state = { count: 0 };
                break;
            default:
                // Warn if an unknown action type is received
                console.warn(`Unknown action type: ${action.type}`);
                return; // Exit the function without notifying listeners
        }

        console.log(`Updated State after ${action.type}:`, this.state); // Log the new state after action

        // Notify all subscribed listeners about the state change
        this.notifyListeners();
    }

    // Method to add a new listener to the listeners array
    subscribe(listener) {
        console.log("New listener added."); // Log when a new listener is added
        this.listeners.push(listener); // Add the listener function to the listeners array
    }

    // Method to notify all listeners about a state change
    notifyListeners() {
        console.log("Notifying listeners..."); // Log that listeners are being notified
        // Call each listener function, passing the current state as an argument
        this.listeners.forEach(listener => listener(this.state));
    }
}

// Create a new instance of Store
const store = new Store();

// Add a listener to log the new state to the console whenever it changes
store.subscribe((newState) => { 
    console.log('New State:', newState); 
});

// Scenario 1: Initial State Verification
console.log('Initial State:', store.getState()); // Should log: { count: 0 }

// Scenario 2: Incrementing the Counter
store.dispatch({ type: 'ADD' }); // Dispatch an ADD action to increase count by 1
store.dispatch({ type: 'ADD' }); // Dispatch another ADD action to increase count by 1

// Scenario 3: Decrementing the Counter
store.dispatch({ type: 'SUBTRACT' }); // Dispatch a SUBTRACT action to decrease count by 1

// Scenario 4: Resetting the Counter
store.dispatch({ type: 'RESET' }); // Dispatch a RESET action to set count back to 0

