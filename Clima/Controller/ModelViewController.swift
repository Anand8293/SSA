//
//  ModelViewController.swift
//  Clima
//
//  Created by Sonu on 19/07/20.
//  Copyright © 2020 App Brewery. All rights reserved.
//

import UIKit

class ModelViewController: BaseViewController, UINavigationControllerDelegate{
    
    var imagePicker: UIImagePickerController!
    
    @IBOutlet weak var mainScroll: UIScrollView!
    @IBOutlet weak var topView: UIView!
    @IBOutlet weak var profileImageview: UIImageView!
    @IBOutlet weak var nameLbl: UILabel!
    @IBOutlet weak var desLbl: UILabel!
    @IBOutlet weak var bookingModelBtn: UIButton!
    @IBOutlet weak var modelDetailBtn: UIButton!
    @IBOutlet weak var connectionBtn: UIButton!
    @IBOutlet weak var lineView: UIView!
    @IBOutlet weak var bgViewHeight: NSLayoutConstraint!
    
    @IBOutlet weak var imgTopMargin: NSLayoutConstraint!
    
    var maxHeight : CGFloat = 350
    var minHeight: CGFloat = 120
    var imgTop: CGFloat = 100
    
    var slides: [UIView] = []
    
    enum ImageSource {
        case photoLibrary
        case camera
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        mainScroll.delegate = self
        //     maxHeight = view.frame.height/3
        
        slides = createSlides()
        setupSlideScrollView(slides: slides)
        // Do any additional setup after loading the view.
        
    }
    
    @IBAction func tabBtnDidTap(_ sender: UIButton) {
        UIView.animate(withDuration: 0.3) {
            if sender.tag == 0 {
                self.scrollToPage(page: 0, animated: true)
                self.lineView.center.x = self.bookingModelBtn.center.x
                
            }
            else if sender.tag == 1 {
                self.scrollToPage(page: 1, animated: true)
                self.lineView.center.x = self.modelDetailBtn.center.x
            }
            else {
                self.scrollToPage(page: 2, animated: true)
                self.lineView.center.x = self.connectionBtn.center.x
            }
        }
    }
    
    func setupSlideScrollView(slides : [UIView]) {
        //   mainScroll.frame = CGRect(x: 0, y: 0, width: view.frame.width, height: view.frame.height)
        mainScroll.contentSize = CGSize(width: view.frame.width * CGFloat(slides.count), height: view.frame.height + 40)
        mainScroll.isPagingEnabled = true
        
        for i in 0 ..< slides.count {
            slides[i].frame = CGRect(x: view.frame.width * CGFloat(i), y: 0, width:  slides[i].frame.width, height:  slides[i].frame.height)
            mainScroll.addSubview(slides[i])
        }
    }
    
    func createSlides() -> [UIView] {
        
        let slide1 = Bundle.main.loadNibNamed("MediaStreamView", owner: self, options: nil)?.first as! MediaStreamView
        
        slide1.addImageBtn.addTarget(self, action: #selector(didTapButton), for: .touchUpInside)
        
        
        let slide2 = Bundle.main.loadNibNamed("ModelDetailsView", owner: self, options: nil)?.first as! ModelDetailsView
        
        let slide3 = Bundle.main.loadNibNamed("ConnectionsView", owner: self, options: nil)?.first as! ConnectionsView
        
        
        return [slide1, slide2, slide3]
    }
    
    func scrollToPage(page: Int, animated: Bool) {
        var frame: CGRect = self.mainScroll.frame
        frame.origin.x = frame.size.width * CGFloat(page)
        frame.origin.y = 0
        self.mainScroll.scrollRectToVisible(frame, animated: animated)
    }
    
    @objc func didTapButton() {
        
        
        //Create the AlertController and add Its action like button in Actionsheet
        let actionSheetControllerIOS8: UIAlertController = UIAlertController(title: "Take picture via", message: "", preferredStyle: .actionSheet)
        
        let cancelActionButton = UIAlertAction(title: "Cancel", style: .cancel) { _ in
            print("Cancel")
        }
        actionSheetControllerIOS8.addAction(cancelActionButton)
        
        let saveActionButton = UIAlertAction(title: "Camera", style: .default)
        { _ in
            self.selectImageFrom(.camera)
        }
        actionSheetControllerIOS8.addAction(saveActionButton)
        
        let deleteActionButton = UIAlertAction(title: "Photo Library", style: .default)
        { _ in
            self.selectImageFrom(.photoLibrary)
        }
        actionSheetControllerIOS8.addAction(deleteActionButton)
        self.present(actionSheetControllerIOS8, animated: true, completion: nil)
        
        //        guard UIImagePickerController.isSourceTypeAvailable(.camera) else {
        //            selectImageFrom(.photoLibrary)
        //            return
        //        }
        //
    }
    
    func selectImageFrom(_ source: ImageSource){
        imagePicker =  UIImagePickerController()
        imagePicker.delegate = self
        switch source {
        case .camera:
            imagePicker.sourceType = .camera
        case .photoLibrary:
            imagePicker.sourceType = .photoLibrary
        }
        present(imagePicker, animated: true, completion: nil)
    }
    
}

extension ModelViewController: UIScrollViewDelegate {
    
    
    public func scrollViewDidScroll(_ scrollView: UIScrollView) {
        if scrollView == mainScroll {
            let offset = scrollView.contentOffset.y
            if offset > 0 {
                let height = maxHeight - (offset)
                if height <= minHeight {
                    self.bgViewHeight.constant = minHeight
                }
                else {
                    self.bgViewHeight.constant = height
                }
                
                let scale = 1 - ((offset) / (maxHeight - minHeight))
                self.imgTopMargin.constant = imgTop - offset/2
                self.profileImageview.alpha = scale
                self.profileImageview.transform = CGAffineTransform(scaleX: scale, y: scale)
                self.nameLbl.alpha = scale
                self.nameLbl.transform = CGAffineTransform(scaleX: scale, y: scale)
                self.desLbl.alpha = scale
                self.desLbl.transform = CGAffineTransform(scaleX: scale, y: scale)
                
            }
            
            let pageIndex = round(scrollView.contentOffset.x/view.frame.width)
            let currentPage = Int(pageIndex)
            
            if currentPage == 0 {
                self.lineView.center.x = self.bookingModelBtn.center.x
            }
            else if currentPage == 1 {
                self.lineView.center.x = self.modelDetailBtn.center.x
            }
            else {
                self.lineView.center.x = self.connectionBtn.center.x
            }
            
        }
    }
    
}
extension ModelViewController: UIImagePickerControllerDelegate{
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]){
        imagePicker.dismiss(animated: true, completion: nil)
        guard let selectedImage = info[.originalImage] as? UIImage else {
            print("Image not found!")
            return
        }
        //     imageTake.image = selectedImage
    }
}




