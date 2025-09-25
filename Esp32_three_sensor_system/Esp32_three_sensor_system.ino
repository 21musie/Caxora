// #include <DHT.h>

// #define DHT_PIN 4
// #define LDR_PIN 5
// #define MOISTURE_PIN 36
// #define DHT_TYPE DHT11

// // Moisture calibration
// int dryValue = 2689;
// int wetValue = 1661;

// DHT dht(DHT_PIN, DHT_TYPE);

// void setup() {
//   Serial.begin(115200);
//   dht.begin();
// }

// void loop() {
//   // Read moisture
//   int moistureRaw = analogRead(MOISTURE_PIN);
//   int moisturePercent = map(moistureRaw, dryValue, wetValue, 0, 100);
//   moisturePercent = constrain(moisturePercent, 0, 100);
  
//   // Read DHT11
//   float humidity = dht.readHumidity();
//   float temperature = dht.readTemperature();
  
//   // Read LDR
//   int lightValue = analogRead(LDR_PIN);
  
//   // Print all values
//   Serial.print("Temp: ");
//   Serial.print(temperature);
//   Serial.print("°C | Humidity: ");
//   Serial.print(humidity);
//   Serial.print("% | Light: ");
//   Serial.print(lightValue);
//   Serial.print(" | Moisture: ");
//   Serial.print(moisturePercent);
//   Serial.println("%");
  
//   delay(3000);
// }


// temp humidity , and soil moisture
// #include <DHT.h>

// // Define pins for YOUR exact ESP32
// #define DHT_PIN 4         // D4 (5th pin on top row)
// #define MOISTURE_PIN 36   // VP (GPIO36 - 14th pin on bottom row)

// #define DHT_TYPE DHT11

// // Your moisture calibration
// int dryValue = 2689;
// int wetValue = 1661;

// DHT dht(DHT_PIN, DHT_TYPE);

// void setup() {
//   Serial.begin(115200);
//   dht.begin();
//   Serial.println("ESP32 Plant Monitor Started");
// }

// void loop() {
//   // Read moisture
//   int moistureRaw = analogRead(MOISTURE_PIN);
//   int moisturePercent = map(moistureRaw, dryValue, wetValue, 0, 100);
//   moisturePercent = constrain(moisturePercent, 0, 100);
  
//   // Read DHT11
//   float humidity = dht.readHumidity();
//   float temperature = dht.readTemperature();
  
//   // Print all values
//   Serial.print("Temperature: ");
//   Serial.print(temperature);
//   Serial.print("°C | Humidity: ");
//   Serial.print(humidity);
//   Serial.print("% | Soil Moisture: ");
//   Serial.print(moisturePercent);
//   Serial.println("%");
  
//   delay(3000); // Wait 3 seconds between readings
// }


#include <DHT.h>

// Define pins for YOUR exact ESP32
#define DHT_PIN 4         // D4 (5th pin on top row)
#define LDR_PIN 2         // D2 (4th pin on top row)  
#define MOISTURE_PIN 36   // VP (GPIO36 - 14th pin on bottom row)

#define DHT_TYPE DHT11

// Your moisture calibration
int dryValue = 2689;
int wetValue = 1661;

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  Serial.println("ESP32 Plant Monitor - All 3 Sensors Active");
}

void loop() {
  // Read moisture
  int moistureRaw = analogRead(MOISTURE_PIN);
  int moisturePercent = map(moistureRaw, dryValue, wetValue, 0, 100);
  moisturePercent = constrain(moisturePercent, 0, 100);
  
  // Read DHT11
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  
  // Read LDR
  int lightValue = analogRead(LDR_PIN);
  
  // Print all values
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print("°C | Humidity: ");
  Serial.print(humidity);
  Serial.print("% | Light: ");
  Serial.print(lightValue);
  Serial.print(" | Soil Moisture: ");
  Serial.print(moisturePercent);
  Serial.println("%");
  
  delay(2000); // Wait 3 seconds between readings
}