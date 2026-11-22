# !/bin/sh

echo ""
echo ""

echo "=+=+=+=+=+=+=+=--- Running Python Scripts ---=+=+=+=+=+=+=+="
python3 sitemap-gen.py
python3 resume/resources/timeline-gen.py

echo ""
echo ""

echo "=+=+=+=+=+=+=+=--- Pushing website to GitHub ---=+=+=+=+=+=+=+="
git add .
git commit -a -m "Automatic DB Update"
git push

echo ""
echo ""

# echo "=+=+=+=+=+=+=+=--- Updating server ---=+=+=+=+=+=+=+="
# read -s -p "Enter Server Password Here: " password
# echo "$password" | tailscale ssh andre@ubuntu "sudo -S ./update.sh"

# echo ""
# echo ""