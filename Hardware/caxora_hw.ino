/*
 * Hardware: ESP32 DevKitC (ESP32-WROOM-32)
 * Description: Blinks the built-in LED on GPIO 2.
 * Author: Your Name
 * Date: [Current Date]
 */

// Pin definition for the built-in LED on ESP32 DevKitC
const int builtInLed = 2; // GPIO 2

void setup() {
  // Initialize the built-in LED pin as an output.
  pinMode(builtInLed, OUTPUT);
  
  // (Optional) Start serial communication for debugging
  Serial.begin(115200); // ESP32 commonly uses 115200 baud rate
  Serial.println("Setup complete. Starting blink loop...");
}

void loop() {
  Serial.println("LED ON");
  digitalWrite(builtInLed, HIGH); // Turn the LED on
  delay(1000);                    // Wait for 1000 milliseconds (1 second)
  
  Serial.println("LED OFF");
  digitalWrite(builtInLed, LOW);  // Turn the LED off
  delay(1000);                    // Wait for 1 second
}