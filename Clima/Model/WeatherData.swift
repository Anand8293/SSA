import Foundation

struct WeatherData: Codable {
    var name: String?
    var main: Main?
    var sys: Sys?
    var wind: Wind?
    var clouds: Clouds?
    var weather: [Weather]
}

struct  Main: Codable{
    var feels_like: Float
    var temp : Float?
    var temp_max : Float?
    var temp_min : Float?
}

struct Weather: Codable {
    var id: Int?
    var main: String?
}

struct Sys: Codable {
    var id: Int?
    var country: String?
    var sunrise: Int?
    var sunset: Int?
}

struct Wind: Codable {
    var speed: Float?
}

struct Clouds: Codable {
    var all: Int?
}
