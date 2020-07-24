
protocol WeatherManagerDelegate {
    func didViewUpdated(response: WeatherData?)
    func didFailWothError(_ error: Error?)

}
