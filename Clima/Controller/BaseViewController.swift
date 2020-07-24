//
//  BaseViewController.swift
//  MRVL
//
//  Created by Sonu on 30/04/19.
//  Copyright © 2019 Sachin Saini. All rights reserved.
//

import UIKit
import SideMenu

class BaseViewController: UIViewController {
        
    @IBOutlet weak var titleLbl: UILabel!
    @IBOutlet weak var notificationCountLbl: UILabel!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        
        let menu = storyboard!.instantiateViewController(withIdentifier: "LeftMenuNavigationController") as! SideMenuNavigationController
        menu.menuWidth = (self.view.frame.size.width*0.8)
//        menuLeftNavigationController. = false
        SideMenuManager.default.leftMenuNavigationController = menu
        
 //       SideMenuManager.default.addPanGestureToPresent(toView: view)
        SideMenuManager.default.addScreenEdgePanGesturesToPresent(toView: view)
//        SideMenuManager.default.menuFadeStatusBar = false
        
    }
    
    //MARK:- SideMenu Button Click
    @IBAction func sideMenuBtnDidTap(_ sender: Any) {
        present(SideMenuManager.default.leftMenuNavigationController!, animated: true, completion: nil)
    }

    
}


