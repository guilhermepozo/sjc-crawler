{"filter":false,"title":"installChrome.sh","tooltip":"/installChrome.sh","undoManager":{"mark":10,"position":10,"stack":[[{"start":{"row":4,"column":19},"end":{"row":4,"column":24},"action":"remove","lines":["9.5.0"],"id":2},{"start":{"row":4,"column":19},"end":{"row":4,"column":20},"action":"insert","lines":["1"]},{"start":{"row":4,"column":20},"end":{"row":4,"column":21},"action":"insert","lines":["0"]}],[{"start":{"row":3,"column":15},"end":{"row":3,"column":16},"action":"remove","lines":["e"],"id":3},{"start":{"row":3,"column":14},"end":{"row":3,"column":15},"action":"remove","lines":["d"]},{"start":{"row":3,"column":13},"end":{"row":3,"column":14},"action":"remove","lines":["o"]},{"start":{"row":3,"column":12},"end":{"row":3,"column":13},"action":"remove","lines":["n"]}],[{"start":{"row":3,"column":12},"end":{"row":3,"column":13},"action":"insert","lines":["v"],"id":4},{"start":{"row":3,"column":13},"end":{"row":3,"column":14},"action":"insert","lines":["1"]},{"start":{"row":3,"column":14},"end":{"row":3,"column":15},"action":"insert","lines":["0"]}],[{"start":{"row":6,"column":0},"end":{"row":35,"column":34},"action":"remove","lines":["# Installation | Yarn","# https://yarnpkg.com/en/docs/install#linux-tab","# CentOS / Fedora / RHEL","sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo","sudo yum install -y yarn","","# MockingBot - Run Puppeteer/Chrome Headless on EC2 Amazon Linux","# https://mockingbot.com/posts/run-puppeteer-chrome-headless-on-ec2-amazon-linux","sudo yum install -y cups-libs dbus-glib libXrandr libXcursor libXinerama cairo cairo-gobject pango","","# Install ATK from CentOS 7","sudo rpm -ivh --nodeps http://mirror.centos.org/centos/7/os/x86_64/Packages/atk-2.22.0-3.el7.x86_64.rpm","sudo rpm -ivh --nodeps http://mirror.centos.org/centos/7/os/x86_64/Packages/at-spi2-atk-2.22.0-2.el7.x86_64.rpm","sudo rpm -ivh --nodeps http://mirror.centos.org/centos/7/os/x86_64/Packages/at-spi2-core-2.22.0-1.el7.x86_64.rpm","","# Install GTK from fedora 20","sudo rpm -ivh --nodeps http://dl.fedoraproject.org/pub/archive/fedora/linux/releases/20/Fedora/x86_64/os/Packages/g/GConf2-3.2.6-7.fc20.x86_64.rpm","sudo rpm -ivh --nodeps http://dl.fedoraproject.org/pub/archive/fedora/linux/releases/20/Fedora/x86_64/os/Packages/l/libXScrnSaver-1.2.2-6.fc20.x86_64.rpm","sudo rpm -ivh --nodeps http://dl.fedoraproject.org/pub/archive/fedora/linux/releases/20/Fedora/x86_64/os/Packages/l/libxkbcommon-0.3.1-1.fc20.x86_64.rpm","sudo rpm -ivh --nodeps http://dl.fedoraproject.org/pub/archive/fedora/linux/releases/20/Fedora/x86_64/os/Packages/l/libwayland-client-1.2.0-3.fc20.x86_64.rpm","sudo rpm -ivh --nodeps http://dl.fedoraproject.org/pub/archive/fedora/linux/releases/20/Fedora/x86_64/os/Packages/l/libwayland-cursor-1.2.0-3.fc20.x86_64.rpm","sudo rpm -ivh --nodeps http://dl.fedoraproject.org/pub/archive/fedora/linux/releases/20/Fedora/x86_64/os/Packages/g/gtk3-3.10.4-1.fc20.x86_64.rpm","","# Install Gdk-Pixbuf from fedora 16","sudo rpm -ivh --nodeps http://dl.fedoraproject.org/pub/archive/fedora/linux/releases/16/Fedora/x86_64/os/Packages/gdk-pixbuf2-2.24.0-1.fc16.x86_64.rpm","","# Install Japanese fonts","# CentOSでもWindowsでも使える！ 日本語フォント（ゴシック編） | 株式会社ビヨンド","# http://beyondjapan.com/blog/2017/01/japanese-gothic-fonts-on-linux","sudo yum install -y vlgothic-fonts"],"id":5},{"start":{"row":6,"column":0},"end":{"row":6,"column":150},"action":"insert","lines":["yum -y install libX11 libXcomposite libXcursor libXdamage libXext libXi libXtst cups-libs libXScrnSaver libXrandr alsa-lib pango atk at-spi2-atk gtk3 "]}],[{"start":{"row":6,"column":0},"end":{"row":6,"column":1},"action":"insert","lines":["s"],"id":6},{"start":{"row":6,"column":1},"end":{"row":6,"column":2},"action":"insert","lines":["u"]},{"start":{"row":6,"column":2},"end":{"row":6,"column":3},"action":"insert","lines":["d"]},{"start":{"row":6,"column":3},"end":{"row":6,"column":4},"action":"insert","lines":["o"]}],[{"start":{"row":6,"column":4},"end":{"row":6,"column":5},"action":"insert","lines":[" "],"id":7}],[{"start":{"row":6,"column":155},"end":{"row":6,"column":164},"action":"insert","lines":["dbus-glib"],"id":8}],[{"start":{"row":6,"column":164},"end":{"row":6,"column":165},"action":"insert","lines":[" "],"id":9}],[{"start":{"row":6,"column":165},"end":{"row":6,"column":174},"action":"insert","lines":["libXrandr"],"id":10}],[{"start":{"row":6,"column":174},"end":{"row":6,"column":175},"action":"insert","lines":[" "],"id":11}],[{"start":{"row":6,"column":175},"end":{"row":6,"column":186},"action":"insert","lines":["libXinerama"],"id":12}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":10.59765625,"selection":{"start":{"row":6,"column":0},"end":{"row":6,"column":186},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":23,"mode":"ace/mode/sh"}},"timestamp":1550674156071,"hash":"937b81913b8f0210ad11c5570922514cabe115e6"}